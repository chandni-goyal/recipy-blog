  function edit_submit_form(){

        //fetch ingredients
        var ar_ingr = [];
        var listItems = $("#edit_ingredients_list li");
        listItems.each(function(li) {
            ar_ingr.push($(this).text());
        });

        //fetch steps
        var ar_steps = [];
        var listItems = $("#edit_step_list li");
        listItems.each(function(li) {
            ar_steps.push($(this).text());
        });

         var name = $("#usr_name").val();
         var email = $("#usr_email").val();
         var recipe_name = $("#edit_recipe_name").val();
         var prev_recipe_name = $("#prev_recipe_name").val();
         var cook_time = $("#edit_cook_time").val();
         var prep_time = $("#edit_prep_time").val();
         var descr = $("#edit_descr").val();

         const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        var today = new Date();
        var d = today.getDate();

        var m = monthNames[today.getMonth()];
        var y = today.getFullYear();

         all_data = {'prev_recipe_name':prev_recipe_name,'name':name,'email':email,recipies:[{'recipe_name':recipe_name,'cook_time':cook_time,
                 'prep_time':prep_time,'descr':descr,'ingredients':ar_ingr,'steps':ar_steps,'day':d,'month':m,
                 'year':y,'Image':''
                }]}

        if(name == "" || email == "" || recipe_name == "" || cook_time == "" || prep_time == "" || descr == "" ){
            alert("All fields are mandatory");
        }else if(ar_ingr.length == 0){
            alert("Please add Ingredients before submit");
        }else if(ar_steps.length == 0){
            alert("Please add steps before submit");
        }
        else{

                $.ajax({
                   type: "POST",
                   data: JSON.stringify(all_data),
                   contentType: "application/json; charset=utf-8",
                   url: "/update_data",
                   success: function(msg){
                     $('.answer').html(msg);
                     $("#edit_recipe_form").find("input[type=text], textarea").val("");
                     $("#edit_ingredients_list").empty();
                     $("#edit_step_list").empty();
                      $('#modalEditRecipy').modal('toggle');
                     alert(msg);
                     show_my_recipies();
                   }
                });
        }
    }

    $(document).on('click', '.edit_recipy', function(e) {
        //edit recipy

        var recipy_name = $(this).attr('id');
        recipy_name = recipy_name.split("__")[0];

        var cook_time = $(this).parent().find(".extra_info").find('.cook_time').val();
        var prep_time = $(this).parent().find(".extra_info").find('.cook_time').val();
        var descr = $(this).parent().find(".extra_info").find('.descr').val();

         $("#edit_recipe_name").val(recipy_name);
         $("#prev_recipe_name").val(recipy_name);
         var cook_time = $("#edit_cook_time").val(cook_time);
         var prep_time = $("#edit_prep_time").val(prep_time);
         var descr = $("#edit_descr").val(descr);

        var listItems1 = $(this).parent().find(".extra_info").find(".ingredients_list li");
        $("#edit_ingredients_list").append(listItems1);

        //fetch steps
        var listItems2 = $(this).parent().find(".extra_info").find(".step_list li");
        $("#edit_step_list").append(listItems2);

        $('#modalEditRecipy').modal('toggle');

   });

    $(document).on('click', '.view_recipy', function(e) {
        //view recipy
        var recipy_name = $(this).attr('id');
        recipy_name = recipy_name.split("__")[0];
        var name = $("#usr_name").val();
        var email = $("#usr_email").val();
        if( name != "" && usr_email != ""){
            window.location.href = "/recipeView?name="+name+"&email="+email+"&recipy_name="+recipy_name;
        }

   });

    $(document).on('click', '.delete_recipy', function(e) {
        //delete recipy
        var recipy_name = $(this).attr('id');
        recipy_name = recipy_name.split("__")[0];
        var name = $("#usr_name").val();
        var email = $("#usr_email").val();
        if( name != "" && usr_email != ""){
            $.ajax({
                      url: "/delete_my_recipy?name="+name+"&email="+email+"&recipy_name="+recipy_name,
                      cache: false,
                      success: function(msg){
                        alert(msg);
                        show_my_recipies();
                      }

            });
        }

   });




    function submit_form(){
        //fetch ingredients
        var ar_ingr = [];
        var listItems = $("#ingredients_list li");
        listItems.each(function(li) {
            ar_ingr.push($(this).text());
        });

        //fetch steps
        var ar_steps = [];
        var listItems = $("#step_list li");
        listItems.each(function(li) {
            ar_steps.push($(this).text());
        });

         var name = $("#usr_name").val();
         var email = $("#usr_email").val();
         var recipe_name = $("#recipe_name").val();
         var cook_time = $("#cook_time").val();
         var prep_time = $("#prep_time").val();
         var descr = $("#descr").val();

         const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        var today = new Date();
        var d = today.getDate();

        var m = monthNames[today.getMonth()];
        var y = today.getFullYear();

         all_data = {'name':name,'email':email,recipies:[{'recipe_name':recipe_name,'cook_time':cook_time,
                 'prep_time':prep_time,'descr':descr,'ingredients':ar_ingr,'steps':ar_steps,'day':d,'month':m,
                 'year':y,'Image':''
                }]}

         if(name == "" || email == "" || recipe_name == "" || cook_time == "" || prep_time == "" || descr == "" ){
            alert("All fields are mandatory");
         }else if(ar_ingr.length == 0){
            alert("Please add Ingredients before submit");
         }else if(ar_steps.length == 0){
            alert("Please add steps before submit");
         }
         else{
                $.ajax({
                   type: "POST",
                   data: JSON.stringify(all_data),
                   contentType: "application/json; charset=utf-8",
                   url: "/add_data",
                   success: function(msg){
                     $('.answer').html(msg);
                     $("#new_recipe_form").find("input[type=text], textarea").val("");
                     $("#ingredients_list").empty();
                     $("#step_list").empty();
                      $('#modalRegisterForm').modal('toggle');
                     alert(msg);
                     show_my_recipies();
                   }
                });
         }

    }

    function clear_all(){
            $("#append_user_data").empty();
            $("#add_new_recipe").addClass('d-none');
    }

    function get_my_recipies(name,email){
        $("#append_user_data").empty();

        $.ajax({
                  url: "/getMyRecipies?name="+name+"&email="+email,
                  cache: false,
                  success: function(html){
                    $("#append_user_data").last().append(html);
                  }

        });
    }

    function show_my_recipies(){

            var name = $("#usr_name").val();
            var email = $("#usr_email").val();
            if( name != "" && email != ""){
                $("#add_new_recipe").removeClass('d-none');
                get_my_recipies(name,email);
            }else{
                alert("Please enter name and email first");
            }
    }

    function addIngredient(){
        var ing_val = $("#ingred").val();
        if(ing_val != ''){
            $("#ingredients_list").append('<li>'+ing_val+'<span class="close">x</span></li>');
            $("#ingred").val('');
        }
    }

    function addStep(){
        var stp_val = $("#steps").val();
        if(stp_val != ''){
            $("#step_list").append('<li>'+stp_val+'<span class="close">x</span></li>');
            $("#steps").val('');
        }
    }

    function addEditIngredient(){
        var ing_val = $("#edit_ingred").val();
        if(ing_val != ''){
            $("#edit_ingredients_list").append('<li>'+ing_val+'<span class="close">x</span></li>');
            $("#edit_ingred").val('');
        }
    }

    function addEditStep(){
        var stp_val = $("#edit_steps").val();
        if(stp_val != ''){
            $("#edit_step_list").append('<li>'+stp_val+'<span class="close" >x</span></li>');
            $("#edit_steps").val('');
        }
    }


    $(document).on('click', '.close', function(e) {
        $(this).parent().remove();
    });


