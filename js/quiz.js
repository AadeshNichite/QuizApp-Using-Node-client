let count;
let data;
let queCount=0;
let countNo=1;
let mark=0;

$(document).ready(function(){
    
     $.ajax({ 
         url:'https://quizappi.herokuapp.com'
        }).done(function(dataNew) {
         data=dataNew; 
    });
    result();
    
    sessionStorage.setItem("mark",mark);
    
 })
 
 function result()
 {
    let marksession=sessionStorage.getItem("mark");
    let mark1=parseInt(marksession, 10);
    $("#result").text(marksession);
 }
  function getJSON(){
  
    queCount++;
    countNo++;
    if(countNo<=7)
    {
        $("#queno").text(countNo);
        $("#que").text(data[0][queCount].question);
        $("#value1").text(data[0][queCount].options[0]);
        $("#value2").text(data[0][queCount].options[1]);
        $("#value3").text(data[0][queCount].options[2]);
        $("#value4").text(data[0][queCount].options[3]);
        sessionStorage.setItem("ans",data[0][queCount].answer);
    }
    else
        {
            $("#value1").attr("disabled", true);
            $("#value2").attr("disabled", true);
            $("#value3").attr("disabled", true);
            $("#value4").attr("disabled", true);

        }
}

function process(value)
{
    selectedValue=value.innerText;
    console.log(selectedValue);
    let ans = sessionStorage.getItem("ans");
    if(ans==selectedValue)
    {
        console.log("Right answer");
        let mark=sessionStorage.getItem("mark");
        let mark1=parseInt(mark, 10);
        mark1++;
        //console.log(mark1);
        sessionStorage.setItem("mark",mark1);   
    }
    else
    {
        console.log("wrong answer");   
    }
    getJSON();  
}

function signUpData()
{
   let name=document.getElementById("userName");
   let email=document.getElementById("Email_Id");
   let password=document.getElementById("Password");
   let reEnteredPass=document.getElementById("Re-Entered-Pass");
   let initialScore=0;
   console.log(email.value);
   console.log(Password.value);  
   console.log(reEnteredPass.value);
   if((!name.value && !email.value && !password.value && !reEnteredPass.value))
    {
        alert("Fill the data..");
       
    }
    else if(!(password.value === reEnteredPass.value)){

        alert("Password does not matchs"); 
    }
    else
    {
       $.ajax({
        url: 'https://quizappi.herokuapp.com/add',
        type: 'POST',
        dataType: 'json',
        data: { 
         'name': name.value, 
         'email':email.value,
         'password' : password.value,
         'score':initialScore
        }
         }).done(function(data){
                if(data.msg=="success")
                {
                    alert("Login successfull")
                    location.replace("/index.html");
                }
                else if(data.msg=="Email Id already present")
                {
                    alert("Email ID Already Present")
                }
        }); 
    }

}

function checkLogin()
{
    let email=document.getElementById("Email_Id");
    let password=document.getElementById("Password");
          $.ajax({
            url: 'https://quizappi.herokuapp.com/login',
            type: 'POST',
            dataType: 'json',
            data: { 
            'email': email.value, 
            'password' : password.value,
            }
        }).done(function(data){
            if(data.msg=="User Exist")
            {
                location.replace('/frontend/instruction.html');
            }
            else if(data.msg=="User Does Not Exist")
            {
                alert("User Does Not Exist");
                location.replace("/index.html");
            }
            else
            {
                alert("User Does Not Exist");
            }
    }); 
} 


function startTimer() {
    var time_in_minutes = 3;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes*60*1000);
    function time_remaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
    }
    function run_clock(id,endtime){
        var clock = document.getElementById('timer');
        function update_clock(){
            var t = time_remaining(endtime);
            document.getElementById("timer").innerHTML=t.minutes+':'+t.seconds;
            if(t.total<=0){
                clearInterval(timeinterval);
                location.replace("index2.html");
             }
        }
        update_clock();
        var timeinterval = setInterval(update_clock,1000);
    }
        run_clock('timer',deadline);
}



    

