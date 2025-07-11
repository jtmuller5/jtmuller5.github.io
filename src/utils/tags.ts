/**
 * Utility functions for working with tags
 */

/**
 * Convert a tag to a URL-friendly slug
 */
export function tagToSlug(tag: string): string {
	return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Convert a slug back to a tag (for display purposes)
 */
export function slugToTag(slug: string): string {
	return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get all unique tags from a collection of posts
 */
export function getAllTags(posts: Array<{ data: { tags?: string[] } }>): string[] {
	const tagSet = new Set<string>();
	
	posts.forEach(post => {
		if (post.data.tags) {
			post.data.tags.forEach(tag => tagSet.add(tag));
		}
	});
	
	return Array.from(tagSet).sort();
}

/**
 * Get posts that have a specific tag
 */
export function getPostsByTag<T extends { data: { tags?: string[] } }>(
	posts: T[],
	tag: string
): T[] {
	return posts.filter(post => 
		post.data.tags?.some(postTag => 
			tagToSlug(postTag) === tagToSlug(tag)
		)
	);
}

/**
 * Get tag counts for displaying popular tags
 */
export function getTagCounts(posts: Array<{ data: { tags?: string[] } }>): Record<string, number> {
	const tagCounts: Record<string, number> = {};
	
	posts.forEach(post => {
		if (post.data.tags) {
			post.data.tags.forEach(tag => {
				tagCounts[tag] = (tagCounts[tag] || 0) + 1;
			});
		}
	});
	
	return tagCounts;
}
