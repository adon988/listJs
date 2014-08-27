(function ( $ ) {
  $.fn.list_left = function(elem,callback){

    var tg = $(this);

    //--------------------------------------------------------------------
    //Center 綁定 click event
    tg.bind_click = function(){
      $(elem.center_btn).bind('click',function(){

        //reset
        tg.reset_option(0);

        //get_data
        tg.get_data(-1, 0);

        //歸0
        $(elem.list_option).each(function(){
          $(this).find('option').eq(0).prop("selected", true);
        });

        callback('0','0');

      });

      $(elem.center_btn).click();

    }//end bind_click
    
    //--------------------------------------------------------------------
    //Option 綁定 change event
    tg.bind_change = function(){

      $(elem.list_option).each(function(i){
        
        var list_option_length = $(elem.list_option).length -1;
        
          $(this).bind('change',function(){

            var id = $(this).val();

            if(i < list_option_length){

              //reset
              tg.reset_option(i);

            }

            //callback 判斷
            if(id==''){
              id_s = $(elem.list_option).eq(i-1).val(); //如果選擇option 為空值，則取得上一層ID
              type = i; //如果選擇option 為空值，則回到上一層
            }else{
              id_s = id;
              type = i+1;
            }

            callback(id_s,type);

            //get_data
            tg.get_data(i, id);


          })//end bind change

      })//end each
    }//end bind_change()
    tg.bind_change();

    //--------------------------------------------------------------------
    //取出資料
    tg.get_data = function(level, id){

          var n = level+1;//next i

          if(id===''){

            $(elem.list_option).eq(n).html('');

            return;
          }

          var request = $.ajax({

            url: "hierarchy_left.php",

            type: "POST",

            data: { id : id, level: n+1, floor: elem.floor_index, host: elem.host_index, machine: elem.machine_index},

            dataType: "html"

          });

          request.done(function( msg ) {

            $(elem.list_option).eq(n).html(msg);

          });

          request.fail(function( jqXHR, textStatus ) {

            alert( "Request failed: " + textStatus );

          });
    }//end get_data

    //--------------------------------------------------------------------
    //reset 
    tg.reset_option = function(v){
      $(elem.list_option).each(function(i){

        if(i>v){
           $(this).text('');
        }

      })
    }//end reset

    //--------------------------------------------------------------------
    // initial function
    tg.init = function(){

      tg.bind_click();

    }//end init
    tg.init();


    //--------------------------------------------------------------------
    //return
    return {
        get_data : function(level, id) { tg.get_data(level, id); }
    }

  }



}( jQuery ));
// end list_left.js