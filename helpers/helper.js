
// Function to test for valid email addresses
const isEmail = (element)=>{    
    
    // Regex for testing emails 
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    // Return validity
    return emailRegex.test(element); 
};

// Function to test for valid phone numbers
const isPhone = (element)=>{    
    
    // Regex for testing phone numbers
    // Phone number should strictly have 12 digits 
    var phoneRegex =  /^\d{12}$/;
 
    // Return validity
    return phoneRegex.test(element); 
};

// Function to test for valid valid numericals
const isNumber = (element)=>{    
    
    // Regex for testing numbers
    // Phone number should strictly have 12 digits 
    var numberRegex =  /^[0-9]+$/;
 
    // Return validity
    return numberRegex.test(element); 
};

// Export modules
module.exports ={isEmail, isPhone, isNumber};

