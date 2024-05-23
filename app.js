let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');



let wave_len = 600*Math.pow(10,-9);
let t = 500*Math.pow(10,-6);
let size=200*Math.pow(10,-6);
let n = 5;





const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );

ctx.canvas.width=availableScreenWidth/100*80;
ctx.canvas.height=availableScreenHeight/100*40;

let width = (canvas.width);
let height = (canvas.height);


let n_text = document.getElementById("n_id");
let size_text = document.getElementById("size_id");
let t_text = document.getElementById("t_id");
let wave_len_text = document.getElementById("wave_len_id");


let resultButton = document.getElementById('result');

showMessage(wave_len,n,size,t);


function getI(fi,n,t,size,wave_len){
    let u=Math.PI*size/wave_len*Math.sin(fi);
    u=u*Math.PI/180;
    let delta=Math.PI*t/wave_len*Math.sin(fi);
    delta=delta*Math.PI/180;
    let I = (Math.sin(u)/u)*(Math.sin(u)/u)*(Math.sin(n*delta)/Math.sin(delta))*(Math.sin(n*delta)/Math.sin(delta));
    return I;
}


function showMessage(wave_len,n,size,t) {
    let massx = [];
    let massy = [];

    let fi = -Math.PI/6;
    while (fi <= Math.PI/6){
        massx.push(Math.sin(fi));
        massy.push(getI(fi,n,t,size,wave_len));
        fi+=0.001;
    }
    

    var result ={
        x: massx,
        y: massy,
        mode:'lines', line: {color: "#04baecdf"}
    };
    
    var baseLayout = {
        title: 'Зависимость интенсивности от синуса угла дифракции',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 'sin',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'I,Вт/м^2',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };

    for (let i = 0; i < massy.length; ++i){
        let currentIntensity = massy[i];
        let currentColor = 255 * currentIntensity / (n ** 2);
        let color=`rgba(${currentColor},${currentColor},${currentColor}, 1)`;

        ctx.fillStyle = color;
        ctx.fillRect(i, 0, 1, height);
    }
    
    
    Plotly.react( 'tester', [result], baseLayout );
}

resultButton.onclick = function(){
    wave_len = parseFloat(wave_len_text.value)*Math.pow(10,-9);
    t = parseFloat(t_text.value)*Math.pow(10,-6);
    n = parseFloat(n_text.value);
    size = parseFloat(size_text.value)*Math.pow(10,-6);
   
    if (n < 0 || size<0 || wave_len< 0 || t <0){
        alert("Значения не могут быть отрицательными!")
        
    }
    
    else{
    
        showMessage(wave_len,n,size,t);
    }

    
}