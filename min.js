//////////////////////////////////////////////
/////////////// KINEMATICS ///////////////////
//////////////////////////////////////////////
var d, vi, vf, a, t, quantities, madeIt, result, result2, zero, makeSense;

$("#calculate").click(function(){
    updateVariables();
    executeEqns();
    
});

$(".animate").click(function(){
    canAnimate();
    if (makeSense){
        animation();
        $("#instructText").empty().append("Below is a simulation of a ball given your inputs; click Animate to run your simulation-->");
    }else{
        $("#instructText").empty().append("Sorry, a simulation can not be genrated with the inputs you have provided.");
    }
});

function noDisplacement(){
    // vf = vi + at
    
    if (vf == null){
        vf = vi + a * t;
    }
    else if (vi == null){
        vi = vf - a * t;
    }
    else if (a == null){
        a = (vf - vi) / t;
    }
    else if (t == null){
        t = (vf - vi) / a;
    }
}

function noAcceleration(){
    // x = 1/2(vf+vi)t

    if (vf == null){
        vf = (2 * d) / t - vi;
    }
    else if (vi == null){
        vi = (2 * d) / t - vf;
    }
    else if (d == null){
        d = 0.5 * (vf + vi) * t;
    }
    else if (t == null){
        t = (2 * d) / (vf + vi);
    }
}

function noFinalVelocity(){
    // x = vit + 1/2at^2
    if (a == null){
        a = 2 * (d - (vi * t)) / (t * t);
    }
    else if (vi == null){
        vi = (d - 0.5 * a * (t * t)) / t;
    }
    else if (d == null){
        d = (vi * t) + (0.5 * a * t * t);
    }
    else if (t == null){ 
       if (vi*vi + 2*a*d){
            result = ((-vi)+Math.pow((vi*vi + 2*a*d),2))/ (a);
            result2 = ((-vi)-Math.pow((vi*vi + 2*a*d),2))/ (a);
            if (result >= 0){
                time = result;
            }
            else{
                time = result2;
            }
       }
       else{
           alert("You are getting a negative time with these imputs")
       }
    }
}

function noTime(){
    // vf^2 = vi^2 + 2ax
    if (vf == null){
        vf = Math.sqrt(Math.pow(vi, 2) + 2 * a * d);
    }
    else if (vi == null){
        vi = Math.sqrt(Math.pow(vf, 2) - 2 * a * d);
    }
    else if (d == null){
        d = (Math.pow(vf, 2) - Math.pow(vi, 2)) / (2 * a);
    }
    else if (a == null){
        a = (Math.pow(vf, 2) - Math.pow(vi, 2)) / (2 * d);
    }
}

function executeEqns(){
    if ((quantities.filter(x => (x)).length + (zero)) >= 3 && (quantities.filter(x => (x)).length + (zero)) !== 5){
        madeIt = true;
        if (d == null){
        noDisplacement();
        noTime();}
        if (vf == null){
        noFinalVelocity();
        noTime();}
        if (a == null){
        noAcceleration();
        noDisplacement();}
        if (t == null){
        noTime();
        noDisplacement();}
        $(".instructions").css("color", "black");
        $("input").css("border", "2px solid #ccc");
        $(".outcomes").css("visibility", "visible");
        $("#main").css("visibility", "visible")
    }
    else{
        $(".instructions").css("color", "red");
        $("input").css("border", "2px solid #ff0033");
        $(".outcomes").css("visibility", "hidden");
        $("#main").css("visibility", "hidden");
    }
    madeIt ? showValues() : void(0);
}

function updateVariables(){
    d = parseFloat(document.getElementById("displacementVal").value);
    vi = parseFloat(document.getElementById("initialVelocityVal").value);
    vf = parseFloat(document.getElementById("finalVelocityVal").value);
    a = parseFloat(document.getElementById("accelerationVal").value);
    t = parseFloat(document.getElementById("timeVal").value);
    
    quantities = [d, vi, vf, a, t]
    isNaN(d) ? d = null : void(0);
    isNaN(vi) ? vi = null : void(0);
    isNaN(vf) ? vf = null : void(0);
    isNaN(a) ? a = null : void(0);
    isNaN(t) ? t = null : void(0);
    
    let value;
    zero = 0;
    for (value of quantities){
        if (value == 0){
            zero++;
        }
    }
    makeSense = true;
    madeIt = false;
    result = "";
    result2 = "";
}

function showValues(){
    $("#main").empty().append("Displacement: " + d +" m"+"<br>" + "Initial Velocity: " + vi +" m/s"+"<br>"+ "Final Velocity: " + vf + " m/s"+"<br>" + "Acceleration: " + a + " m/s/s"+"<br>" + "Time: " + t + " s");
}

function canAnimate(){
    makeSense = true;
    if (t<0 || ((vf-vi)/t !== a) || (vi>0 && vf>0 && d<0) || (vi<0 && vf<0 && d>0)){
        makeSense = false;
    }
}
function animation(){
    anime.easings['acceleration'] = function(t){
        return (vf-vi)/t
    }
    console.log()
    let ballAnimation = anime({
        targets: '.ball',
        translateX: (d * 50),
        duration: (t * 1000),
        easing: function(vf, vi, t) {
            return function(t) {
              return (vf-vi)/t;
            }
          }   
      });    
      animation.play;
    }

//////////////////////////////////////////////
/////////////// PROJECTILE ///////////////////
//////////////////////////////////////////////

var vel, hei, tim, dis, values, gravity;


$("input").on('input', function() {
    variables();
});

$("#hei").on('input', function() {
    tim = Math.sqrt(hei/4.9);
    if (vel!==null){
        dis = vel * tim;
    }if (dis!==null){
        vel = dis / tim;
    }
    console.log(vel, hei, tim, dis)
});
$("#tim").on('input', function() {
    hei = 4.9*Math.pow(tim, 2);
    vel!==null ? dis = vel * tim : void(0);
    dis!==null ? vel = dis / tim : void(0);
    console.log(vel, hei, tim, dis)
});
$("#vel").on('input', function(){
    tim!==null ? dis = vel * tim : void(0);
    if(vel!==null && dis!==null){
        hei = 4.9*Math.pow((dis/vel), 2);
        tim = Math.sqrt(hei/4.9);
    }


    console.log(vel, hei, tim, dis)
});
$("#dis").on('input', function(){
    tim!==null ? vel = dis / tim : void(0);
    if(vel!==null && dis!==null){
        hei = 4.9*Math.pow((dis/vel), 2);
        tim = Math.sqrt(hei/4.9);
    }
    console.log(vel, hei, tim, dis)

});
$("input").on('input', function() {
    see();
});

function variables(){
    vel = parseFloat(document.getElementById("vel").value);
    hei = parseFloat(document.getElementById("hei").value);
    tim = parseFloat(document.getElementById("tim").value);
    dis = parseFloat(document.getElementById("dis").value);
    isNaN(vel) ? vel = null : void(0);
    isNaN(hei) ? hei = null : void(0);
    isNaN(tim) ? tim = null : void(0);
    isNaN(dis) ? dis = null : void(0);
    values = [vel, hei, tim, dis]
}

function see(){
    
    $("#vel").val(parseFloat(vel));
    $("#hei").val(parseFloat(hei));
    $("#tim").val(parseFloat(tim));
    $("#dis").val(parseFloat(dis));
}

