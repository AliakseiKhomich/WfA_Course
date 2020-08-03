console.log( 'Task 1 is starting!' );
var sUserName = prompt( 'What is your name?' );
console.log( "User name is: " + sUserName );
var iPosNumber = -1;
var bNumExist = false;

for( i=0; i<=9; i++ ) {
  iPosNumber = sUserName.indexOf( i );
  if ( iPosNumber !== -1) {
      console.log ( "Number found in the Username!");
      bNumExist = true;  
      break;
  };
};

var sNewUserName = "";
var aUserName = sUserName.split( "" );

if ( bNumExist ) {   
    for ( i = 0; i < aUserName.length; i++ ) {
        if ( i % 2 === 0 ) {
          sNewUserName += aUserName[i].toUpperCase();
        }
        else {
          sNewUserName += aUserName[i].toLowerCase();  
        }        
    };    
}
else {
    console.log ( "Numbers in the Username not found!");
    
    for ( i = aUserName.length - 1; i>=0; i--) {
        sNewUserName += aUserName[i];
    };    
};
console.log("New User Name is: " + sNewUserName );
alert(sNewUserName)