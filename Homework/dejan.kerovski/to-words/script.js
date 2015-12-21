var numText = {
    ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'] ,  
     tens: ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    ilions: ['', ' thousand ', ' million ', ' billion ', ' trillion ']
               };

(function( ones, tens, ilions ) {

    var input = document.getElementById( 'input' );
    var output = document.getElementById( 'display' );
    var toWords =document.getElementById('button');



//First block of code, function to get the number from input,
//and i check is whole number, and less then maximal input. 
   button.onclick = function toWords() {                                           
        var number = input.value,
           arrayNum = [],
            words = '',
            i = 0;

        if ( number.length === 0 ) {
            output.value  = 'Please type a number into the text-box!!!';
            return; 
      
        }
         number = Number( number) ;
        if ( isNaN( number ) || (number < 0) || (number > 999999999999)) {
            output.value  = 'Please type a valild number!!!';
            return;                                                
        }
        

        // This block of code make a reverse of number, and divide in 3 digits part,
        // and put in array , for example If I entry 123456 , give me
      // array with inverse number [456 , 123]
                                                         
        while ( number ) {         
           arrayNum.push( number % 1000 );            
            number = parseInt( number / 1000, 10 );   
        }

       // Here i get every 3 digit block of the array , devide with 100 , give me first digit of block ,
       // then with 10 to give me second digit, and last I get a third digit with modul 10. 
        while (arrayNum.length ) {
         words = (function( num ) {
                var first = Math.floor( num / 100 ),
                    second = Math.floor( num / 10 ) % 10,
                   third = num % 10;

          return ( first > 0 ? ones[first] + ' hundred ' : '' ) +
                 ( second >= 2 ? tens[second] + ' ' + ones[third] : ones[10*second + third] );

                      //delite the fitst number of array
            })         (arrayNum.shift()) + ilions[i++] + words;
        }

   
        output.value = words.charAt(0).toUpperCase() + words.slice(1);

    };


})( numText.ones, numText.tens, numText.ilions );

