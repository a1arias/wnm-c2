define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, BackBone){
  var model = BackBone.Model.extend({
    idAttribute: '_id',

    url: function(){
      var url;

      //debugger;

      if(this.isNew()){
        // post
        url = '/targets';
      } else if(this.id && !this.attributes._method) {
        // get, put
        url = '/targets/' + this.id;
      } else if(this.id && this.attributes._method && 
          this.attributes._method == 'delete'){
        // delete
        url = '/targets/' + this.id;
      } else {
        url = '/targets';
      }

      return url;
    },
    defaults: {
      url: '',
      orgId: '',
      createDate: '',
      modifiedDate: '',
    },
    validate: function(attrs){
      var fields,
        errors = {},
        i, len,
        titleLen;

      if(!attrs._silent){
        fields = [
          'url'
        ];

        // check number of required fields
        for(i=0, len=fields.length; i<len; i++){
          if(!attrs[fields[i]]){
            errors[fields[i]] = fields[i] + 'required';
          }
        }

        // target url validation
        strLen = (attrs.url) ? attrs.url.length : null;
        if(!strLen || strLen < 6 || strLen > 200){
          errors.url = 'invalid url';
        }

        if(_.keys(errors).length){
          return {
            errors: errors
          };
        }
      }
    }
  });

  return model;
});