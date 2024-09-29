import 'package:auto_route/annotations.dart';
import 'package:flossy/app/constants.dart';
import 'package:flossy/features/authentication/ui/create_account/widgets/create_account_form.dart';
import 'package:flossy/features/fast_booking/ui/fast_booking_account/fast_booking_account_view_model.dart';
import 'package:flossy/features/fast_booking/ui/fast_booking_account/widgets/dentist_cards.dart';
import 'package:flossy/features/fast_booking/ui/fast_booking_account/widgets/dentist_carousel.dart';
import 'package:flossy/features/fast_booking/ui/fast_booking_account/widgets/fast_booking_app_bar.dart';
import 'package:flossy/features/fast_booking/ui/fast_booking_account/widgets/legal_agreements.dart';
import 'package:flossy/features/shared/ui/form_holder.dart';
import 'package:flossy/features/shared/ui/loading_button.dart';
import 'package:flossy/features/shared/ui/section_title.dart';
import 'package:flossy/helpers/keyboard_dismiss_on_pan_down.dart';
import 'package:flossy/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:gap/gap.dart';
import 'package:stacked/stacked.dart';

class FastBookingAccountView extends HookWidget {
  const FastBookingAccountView({
    Key? key,
    @queryParam required this.zip,
  }) : super(key: key);

  final String? zip;

  @override
  Widget build(BuildContext context) {
    TextEditingController firstNameController = useTextEditingController();
    TextEditingController lastNameController = useTextEditingController();
    TextEditingController emailController = useTextEditingController();
    TextEditingController phoneNumberController = useTextEditingController();

    return ViewModelBuilder<FastBookingAccountViewModel>.reactive(
      viewModelBuilder: () => FastBookingAccountViewModel(zip),
      builder: (context, model, child) {
        return Scaffold(
          backgroundColor: AppColors.grey15,
          body: Theme(
            data: Theme.of(context).copyWith(
                textTheme: flossyTextTheme.copyWith(titleMedium: flossyTextTheme.titleLarge),
                inputDecorationTheme: InputDecorationTheme(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(
                        color: AppColors.grey45,
                        width: 2,
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(
                        color: AppColors.grey45,
                        width: 2,
                      ),
                    ),
                    isDense: true)),
            child: KeyboardDismissOnPanDown(
              child: ListView(
                shrinkWrap: true,
                children: [
                  const FastBookingAppBar(),
                  gap24,
                  kIsWideDesktopWeb(context) ? const DentistCards() : const DentistCarousel(),
                  gap24,
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 30,
                      vertical: 24,
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'Create a free account to see available appointments',
                          textAlign: kIsWideDesktopWeb(context)? TextAlign.center: TextAlign.left,
                          style:
                              kIsWideDesktopWeb(context) ? flossyTextTheme.titleLarge : flossyTextTheme.bodyLarge!.copyWith(color: AppColors.grey70),
                        ),
                        const Gap(30),
                        FormHolder(
                          formKey: model.formKey,
                          autovalidate: model.autoValidate,
                          tight: true,
                          children: [
                            const SectionTitle('Full Name'),
                            Flex(
                              mainAxisSize: MainAxisSize.min,
                              direction: kIsWideDesktopWeb(context) ? Axis.horizontal : Axis.vertical,
                              children: [
                                Flexible(
                                  child: TextFormField(
                                    controller: firstNameController,
                                    minLines: 1,
                                    textCapitalization: TextCapitalization.words,
                                    decoration: const InputDecoration(hintText: 'First name'),
                                    validator: (value) => RequiredValidator.validate(value),
                                    onChanged: model.setFirst,
                                    autofillHints: const [AutofillHints.name],
                                  ),
                                ),
                                gap16,
                                Flexible(
                                  child: TextFormField(
                                    controller: lastNameController,
                                    minLines: 1,
                                    textCapitalization: TextCapitalization.words,
                                    decoration: const InputDecoration(hintText: 'Last name'),
                                    validator: (value) => RequiredValidator.validate(value),
                                    onChanged: model.setLast,
                                    autofillHints: const [AutofillHints.familyName],
                                  ),
                                ),
                              ],
                            ),
                            gap24,
                            const SectionTitle('Email'),
                            TextFormField(
                              controller: emailController,
                              minLines: 1,
                              keyboardType: TextInputType.emailAddress,
                              decoration: const InputDecoration(hintText: 'Enter email'),
                              validator: (value) {
                                String? res = RequiredValidator.validate(value);
                                if (res != null) return res;

                                return EmailValidator.validate(value);
                              },
                              onChanged: model.setEmail,
                              autofillHints: const [AutofillHints.newUsername],
                            ),
                            gap24,
                            const SectionTitle('Phone Number'),
                            TextFormField(
                              controller: phoneNumberController,
                              minLines: 1,
                              keyboardType: TextInputType.phone,
                              inputFormatters: [model.phoneMaskFormatter],
                              decoration: const InputDecoration(
                                hintText: '(123) 456-7890',
                                prefixText: '+1 ',
                              ),
                              validator: (value) {
                                String? res = RequiredValidator.validate(value);
                                if (res != null) return res;

                                return model.phoneMaskFormatter.getUnmaskedText().length < 10 ? 'Enter a valid phone number' : null;
                              },
                              onChanged: (value) {
                                model.setPhone(value.isEmpty ? model.initialPhoneDisplayValueNoPrefix ?? '' : value);
                              },
                            ),
                            gap24,
                            const SectionTitle('Do you have dental insurance?'),
                            DropdownButtonFormField<bool?>(
                              onChanged: (value) {
                                debugPrint('Insurance: $value');
                                model.setHasInsurance(value);
                              },
                              decoration: const InputDecoration(hintText: 'Select option'),
                              items: const [
                                DropdownMenuItem(
                                  child: Text('Yes'),
                                  value: true,
                                ),
                                DropdownMenuItem(
                                  child: Text('No'),
                                  value: false,
                                )
                              ],
                            ),
                            gap24,
                            const LegalAgreements(),
                            gap36,
                            LoadingButton(
                              enabled: model.readyForCreation(),
                              titleText: AppStrings.createAccount,
                              onPressed: () {
                                if (!model.validateFields()) return;

                                model.handleSubmission(
                                  context: context,
                                  runAsFuture: true,
                                  onSubmit: model.onCreateAccountSubmit,
                                  onFailure: (error) => model.onCreateAccountFailure(error),
                                  onSuccess: model.onCreateAccountSuccess,
                                  caller: 'FastBookingAccountView',
                                );
                              },
                              loading: model.isBusy,
                            ),
                            gap24,
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
