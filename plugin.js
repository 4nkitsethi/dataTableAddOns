/**
 * 
 * *  @author      -  Ankit Sethi
 * *  @date        -  2/20/2020 3:24
 * *  @description -  This is an addOn for dataTable's that reduces developer's efforts :-)
 * *  @version     -  1.0
 *  
 **/

(function( $ ) { 
    $.fn.dataTableAddOn = function() {
        if(!$.fn.dataTable.isDataTable(this)){
            this.dataTable({
                            initComplete: function () {
                                this.api().columns('[select-filter]').every( function (settings, column) {
                                    $this = this;
                                    var select = $("<select class='custom-select custom-select-sm mx-1'><option value='' default>Choose</option></select>")
                                                .appendTo( $(".dataTables_filter").addClass("d-flex"))
                                                .on( 'change', function () {
                                                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                                    $this.search($.trim(val),false,true,false).draw();
                                                });   
                                            
                                    if(typeof $(this.header()).data('values') != "undefined"){
                                        $.each($(this.header()).data('values').split(","),function(i,v){	                		 
                                                select.append( '<option value="'+v+'">'+v+'</option>' )
                                        });             	
                                    }else{
                                        this.data().sort().unique().each(function ( d, j ) {
                                            select.append( '<option value="'+d+'">'+d+'</option>' )
                                        });	                	
                                    }        
                                });
                            }
                        });
        }
        return this;
    }; 
}( jQuery ));