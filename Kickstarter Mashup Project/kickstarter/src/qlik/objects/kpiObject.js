class kpiObject {
    constructor(data){
        this.data = data; 
    }

    init(){
        this.data.object.getLayout().then(layout=>{
            this.layout = layout;
            this.update()
        })
    }

    update(){

        function currencyFormat(num){
            return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        this.data.object.getLayout().then(layout => {
            let data = layout.qHyperCube.qDataPages[0].qMatrix[0]
            let dim = layout.qHyperCube.qMeasureInfo;

            let arr = [];
            $('#kpi1').html('')
            $('#kpi2').html('')
            $('#kpi3').html('')

            data.map(function(val, index){
                let dimension = dim[index].qFallbackTitle
                arr.push({ 'index': index, 'value': val.qNum, 'dimension': dimension })
            })
            $('#kpi1').html('<div><span class="kpi-value">' + currencyFormat(arr[0].value) +'</span> ' + '<span class="kpi-dim">' + arr[0].dimension +'</span></div>' )
            $('#kpi2').html('<div><span class="kpi-value">' + currencyFormat(arr[1].value) +'</span> ' + '<span class="kpi-dim">' + arr[1].dimension +'</span></div>' )
            $('#kpi3').html('<div><span class="kpi-value">' + currencyFormat(arr[2].value) +'</span> ' + '<span class="kpi-dim">' + arr[2].dimension +'</span></div>' )
        })
    }


}

export default kpiObject