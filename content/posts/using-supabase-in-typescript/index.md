---
title: "Using Supabase in Typescript"
date: 2024-09-29T15:29:05-04:00
draft: false
categories: ["tutorials"]
tags: ["supabase","typescript","flutter"]
---

nstead of hardcoding Supabase interfaces or types in your TypeScript projects, you can use the Supabase CLI to generate types directly from your database tables. Make sure to add the output inside your src folder so the rest of your application can access it:

```bash
supabase gen types typescript --project-id abcdefghijklmnopqrst > src/types/database.types.ts
```

This command will generate a .types.ts file that contains a single Database interface containing all of your tables and their columns. The output looks something like this (I pulled this from the official docs):

```typescript
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {               // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          name: string       // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
}
```

Once you've generated this Database type, you're all set to add it to your supabase client:

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from './src/types/database.types'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

Inside the src/types folder, I like to add a second file called supabase.ts that defines my specific types using the Tables in the Database. I also add some additional type definitions to pull columns with specific types out of the Tables:

```typescript
// src/types/supabase.ts

import { Tables } from "./database.types";

export type User = Tables<"users">;
export type Project = Tables<"projects">;
export type Pack = Tables<"packs">;
export type Rule = Tables<"rules">;

type NumberFields<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type StringFields<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type BooleanFields<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

type StringOrNullFields<T> = {
  [K in keyof T]: T[K] extends string | null ? K : never;
}[keyof T];

export type ProjectStringOrNullFields = StringOrNullFields<Project>;
export type ProjectNumberFields = NumberFields<Project>;
export type ProjectStringFields = StringFields<Project>;
export type ProjectBooleanFields = BooleanFields<Project>;
```

While this is already a very clean solution, it gets better. You can also define types for queries that span multiple tables so the final result includes nested types. In my AI Co-Founded database, for example, I have a "projects" table and a "rules" table. Projects can contain multiple rules which are linked back to the project via the "project_rules" table. I created a ProjectWithRules type like this:

```typescript
export type ProjectWithRules = QueryData<
  ReturnType<typeof projectWithRulesQuery>
>;

export const projectWithRulesQuery = (id: string) =>
  supabase
    .from("projects")
    .select(`
        *,
        project_rules (
            rule_id,
            rules (
                *
            )
         )
      `)
    .eq('id', id)
    .single();
```

And I can use this type like this:

```typescript
const [project, setProject] = useState<Project | null>(null);
  const [rules, setRules] = useState<Rule[]>([]);

useEffect(() => {
    const fetchProjectAndRules = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch project data
        const { data: projectData, error: projectError } =
          await projectWithRulesQuery(id!);

        if (projectError) throw projectError;

        setProject(projectData);
        setRules(projectData.project_rules.map((p) => p.rules ?? []).flat());
      } catch (error) {
        console.error("Error fetching project and rules:", error);
        setError("Failed to load project and rules. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectAndRules();
  }, [id]);
``` 

Extracting the nested rules list is clunky but you can create a simple utility function that wraps the logic:

```typescript
export function getRules(projectData: ProjectWithRules) {
  return projectData.project_rules.map((p) => p.rules ?? []).flat();
}
```

I created a set of AI rules for building a Supabase project with TypeScript that you can find here; just copy it into your .cursorrules file or upload it to the project knowledge section in Claude and you're all set!