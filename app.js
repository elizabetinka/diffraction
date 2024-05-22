let L = 1;
let L_1 = 0.8;
let m = 1.5;
let k = 0.5;
let beta = 0.01;
let fi1 = 3*Math.PI/12;
let fi2 = 2*Math.PI/12;
let A1=fi1+fi2;
let A2=fi2-fi1;
let g = 9.8




const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );


let L_text = document.getElementById("L_id");
let L_1_text = document.getElementById("L_1_id");
let m_text = document.getElementById("m_id");
let k_text = document.getElementById("k_id");
let beta_text = document.getElementById("beta_id");
let fi1_text = document.getElementById("fi1_id");
let fi2_text = document.getElementById("fi2_id");
let A1_text = document.getElementById("A1_id");
let A2_text = document.getElementById("A2_id");
let inputFrec1 = document.getElementById('valueFrec1');
let inputFrec2 = document.getElementById('valueFrec2');

let resultButton = document.getElementById('result');

showMessage(L,L_1,k,m,beta,fi1,fi2,A1,A2);


function getFrec1(L){
    return Math.sqrt(g/L);
}
function getFrec2(L,L_1,k,m){
    return Math.sqrt(g/L+2*k*L_1*L_1/(m*L*L));
}

function getFI1(t,frec1,frec2,fi1,fi2,A1,A2,beta){
    let ans = 0.5*(A1*Math.exp(-beta*t)*Math.cos(frec1*t+fi1));
    ans += 0.5*(A2*Math.exp(-beta*t)*Math.cos(frec2*t+fi2));
    return ans;
}
function getFI2(t,frec1,frec2,fi1,fi2,A1,A2,beta){
    let ans = 0.5*(A1*Math.exp(-beta*t)*Math.cos(frec1*t+fi1));
    ans -= 0.5*(A2*Math.exp(-beta*t)*Math.cos(frec2*t+fi2));
    return ans;
}

function getV1(t,frec1,frec2,fi1,fi2,A1,A2,beta){
    let ans = -0.5*beta*A1*Math.exp(-beta*t)*Math.cos(frec1*t+fi1);
    ans += -0.5*A1*frec1*Math.exp(-beta*t)*Math.sin(frec1*t+fi1);
    ans += -0.5*beta*A2*Math.exp(-beta*t)*Math.cos(frec2*t+fi2);
    ans += -0.5*A2*frec2*Math.exp(-beta*t)*Math.sin(frec2*t+fi2);
    return ans;
}

function getV2(t,frec1,frec2,fi1,fi2,A1,A2,beta){
    let ans = -0.5*beta*A1*Math.exp(-beta*t)*Math.cos(frec1*t+fi1);
    ans += -0.5*A1*frec1*Math.exp(-beta*t)*Math.sin(frec1*t+fi1);
    ans += 0.5*beta*A2*Math.exp(-beta*t)*Math.cos(frec2*t+fi2);
    ans += 0.5*A2*frec2*Math.exp(-beta*t)*Math.sin(frec2*t+fi2);
    return ans;
}

function getFI12(t,frec1,frec2,A1,A2,beta){
    let ans = 0.5*(A1*Math.exp(-beta*t)*Math.cos(frec1*t));
    ans += -0.5*(A2*Math.exp(-beta*t)*Math.cos(frec2*t));
    return ans;
}
function getFI22(t,frec1,frec2,A1,A2,beta){
    let ans = 0.5*(A1*Math.exp(-beta*t)*Math.cos(frec1*t));
    ans += 0.5*(A2*Math.exp(-beta*t)*Math.cos(frec2*t));
    return ans;
}

function getV12(t,frec1,frec2,A1,A2,beta){
    let ans = -0.5*beta*A1*Math.exp(-beta*t)*Math.cos(frec1*t);
    ans += -0.5*A1*frec1*Math.exp(-beta*t)*Math.sin(frec1*t);
    ans += 0.5*beta*A2*Math.exp(-beta*t)*Math.cos(frec2*t);
    ans += 0.5*A2*frec2*Math.exp(-beta*t)*Math.sin(frec2*t);
    return ans;
}

function getV22(t,frec1,frec2,A1,A2,beta){
    let ans = -0.5*beta*A1*Math.exp(-beta*t)*Math.cos(frec1*t);
    ans += -0.5*A1*frec1*Math.exp(-beta*t)*Math.sin(frec1*t);
    ans += -0.5*beta*A2*Math.exp(-beta*t)*Math.cos(frec2*t);
    ans += -0.5*A2*frec2*Math.exp(-beta*t)*Math.sin(frec2*t);
    return ans;
}



function showMessage(L,L_1,k,m,beta,fi1,fi2,A1,A2) {
    let massx = [];
    let massyFi1 = [];
    let massyFi2 = [];
    let massyV1 = [];
    let massyV2 = [];
    frec1= getFrec1(L);
    frec2= getFrec2(L,L_1,k,m);
    inputFrec1.innerHTML = ("Нормальная частота Ω1:  "+frec1).substring(0,35);
    inputFrec2.innerHTML = ("Нормальная частота Ω2:  "+frec2).substring(0,35);;
    
    let T = 2*Math.PI/(frec2-frec1);
    A1=fi1+fi2;
    A2=fi2-fi1;
    console.log("T: ", T );
    //console.log("b: ", b, " w0: ",w0, "w: ", w , "w^2: ", w_2);
    for (let i =0; i<(T*2); i +=1){
        massx.push(i)
        massyFi1.push(getFI12(i,frec1,frec2,A1,A2,beta));
        massyFi2.push(getFI22(i,frec1,frec2,A1,A2,beta));
        massyV1.push(getV12(i,frec1,frec2,A1,A2,beta))
        massyV2.push(getV22(i,frec1,frec2,A1,A2,beta))
        //console.log("i: ", i, " q: ",q, "I: ", I, " U: ",U );
    }

    var result ={
        x: massx,
        y: massyFi1,
        mode:'lines', line: {color: "#04baecdf"}
    };
    var result2 ={
        x: massx,
        y: massyFi2,
        mode: 'lines', line: {color: "#ff80f4b8"}
    };
    var result3 ={
        x: massx,
        y: massyV1,
        mode:'lines', line: {color: "#04baecdf"}
        //mode: 'lines', line: {color: "#04BBEC"}
    };
    var result4 ={
        x: massx,
        y: massyV2,
        mode: 'lines', line: {color: "#ff80f4b8"}
        //mode: 'lines', line: {color: "#FF82F4"}
    };
    var baseLayout = {
        title: 'Зависимость угла от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: '𝜙,рад',
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
    var baseLayout2 = {
        title: 'Зависимость скорости от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'v,рад/с',
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
    
    Plotly.react( 'tester', [result,result2], baseLayout );
    Plotly.react( 'tester2', [result3,result4], baseLayout2 );
}

resultButton.onclick = function(){
    L = L_text.value;
    L_1 = L_1_text.value;
    m = m_text.value;
    k = k_text.value;
    beta = beta_text.value;
    fi1 = fi1_text.value*Math.PI/12;
    fi2 = fi2_text.value*Math.PI/12;
    A1 = fi1_text.value*Math.PI/12;
    A2 = fi1_text.value*Math.PI/12;
    if (L < 0 || L_1<0 || m < 0){
        alert("Значения не могут быть отрицательными!")
        console.log("L: ", L, " L_1: ",L_1, "beta: ", beta , "m: ", m);
    }
    else if (L-L_1 <0){
        alert("L1 должно быть меньше L")
        console.log("L: ", L, " L_1: ",L_1, "beta: ", beta , "m: ", m);
    }
    else{
        console.log("L: ", L, " L_1: ",L_1, "beta: ", beta , "m: ", m);
        showMessage(L,L_1,k,m,beta,fi1,fi2,A1,A2);
    }

    
}