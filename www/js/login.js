/**
 * Created by SASWAT on 22/10/2015.
 */

$(document).ready(function () {
  $('#loginForm')
    // IMPORTANT: You must declare .on('init.field.fv')
    // before calling .formValidation(options)
    .on('init.field.fv', function (e, data) {
      // data.fv      --> The FormValidation instance
      // data.field   --> The field name
      // data.element --> The field element

      var $icon = data.element.data('fv.icon'),
        options = data.fv.getOptions(),                      // Entire options
        validators = data.fv.getOptions(data.field).validators; // The field validators

      if (validators.notEmpty && options.icon && options.icon.required) {
        // The field uses notEmpty validator
        // Add required icon
        $icon.addClass(options.icon.required).show();
      }
    })

    .formValidation({
      framework: 'bootstrap',
      icon: {
        required: 'fa fa-asterisk',
        valid: 'fa fa-check',
        invalid: 'fa fa-times',
        validating: 'fa fa-refresh'
      },
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: 'The name is required'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: 'The quantity is required'
            }

          }
        }
      }
    })

    .on('status.field.fv', function (e, data) {
      // Remove the required icon when the field updates its status
      var $icon = data.element.data('fv.icon'),
        options = data.fv.getOptions(),                      // Entire options
        validators = data.fv.getOptions(data.field).validators; // The field validators

      if (validators.notEmpty && options.icon && options.icon.required) {
        $icon.removeClass(options.icon.required).addClass('fa');
      }
    });
});
