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
                                this.api().columns('[select-filter]').every( function () {
                                    var column = this;                                    
                                    var select = $("<select class='custom-select custom-select-sm mx-1'><option value='' default>Filter "+$(column.header()).text()+"</option></select>")
                                        .appendTo( $(".dataTables_filter").addClass("d-flex"))
                                        .on( 'change', function () {
                                            var val = $.fn.dataTable.util.escapeRegex(
                                                $(this).val()
                                            );
                    
                                            column
                                                .search( val ? '^'+val+'$' : '', true, false )
                                                .draw();
                                        } );
                    
                                    column.data().unique().sort().each( function ( d, j ) {
                                        select.append( '<option value="'+d+'">'+d+'</option>' )
                                    } );
                                } );
                            }
                        });
        }
        return this;
    }; 
}( jQuery ));