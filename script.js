function reverseStr(str){
    var listOfChars=str.split('');
    var reverseListOfChars=listOfChars.reverse();
    var reversedStr =reverseListOfChars.join('');
    // return str.split('').reverse().join('');
return reversedStr;
}
function isPalindrome(str){
    var reverse=reverseStr(str);
    if(str===reverse){
        return true;
    }

    else{
        false;
    }
}
//helper funtion
function convertDateToStr(date){
    // ye sab two digit me krnr ko kiya jaa raha and string me convert bhi krne ke liye
    var dateStr={
        day: '',
        month:'',
        year:''
    }
        if(date.day<10){
            dateStr.day='0'+ date.day; // string apane aap ho jata hai jab bhi string ko concatanate krte hai no. se
        }
        else{
            dateStr.day = date.day.toString(); // yaha pr string me convert krnaa hogaa
        }

        if(date.month<10){
            dateStr.month='0'+ date.month;
        }
        else{
            dateStr.month = date.month.toString();
        }

        dateStr.year=date.year.toString();
        return dateStr;
}
// console.log(convertDateToStr(date));
function getAllDateFormates(date){
    var dateStr=convertDateToStr(date);
    var ddmmyyyy=dateStr.day + dateStr.month +dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day + dateStr.month +dateStr.year.slice(-2);
    var mmddyy =dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}
function checkPalindromeForAllDateFormates(date){
    var listOfPalindromes=getAllDateFormates(date);
    var flag=false;
    for(var i=0;i<listOfPalindromes.length;i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag= true;
            break;
        }
    }
    return flag;
}
function isLeapYear(year){
    if(year%400===0){
        return true;
    }if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;

}
function getNextDate(date){
    var day=date.day +1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2){
        if(isLeapYear(year)){
             if(day>29){
                day=1;
                month++;
             }
        }
        else{
            if(day>29){
                day=1;
                month++;
            }

        }
    }
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;

        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return{
        day:day,
        month:month,
        year:year
    };

}
function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormates(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }

    return [ctr,nextDate];

}
// var date={
//     day:21,
//     month:9,
//     year:1999
// };

// console.log(getNextPalindromeDate(date));


var dateInputRef= document.querySelector("#bday-input");
var showBtnRef= document.querySelector("#show-btn");
var outputRef =document.querySelector("#result");
function clickHandler(e){
    // outputRef.innerText=dateInputRef.value;
    var bdayStr=dateInputRef.value;
    if(bdayStr!==''){
        var listOfDate=bdayStr.split("-");
        var date={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        }
    }
    var isPalindrome=checkPalindromeForAllDateFormates(date);
    if(isPalindrome){
        outputRef.innerText="palindrome";
    }
    else{
        var [ctr,nextDate]=getNextPalindromeDate(date);
        outputRef.innerText="Next date: "+nextDate.day + "/"+nextDate.month + "/"+nextDate.year + " After "+ctr+ " days"; 
    }
    
}
showBtnRef.addEventListener("click", clickHandler);

