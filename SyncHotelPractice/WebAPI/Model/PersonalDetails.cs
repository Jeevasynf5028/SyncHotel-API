using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class PersonalDetails:IWalletManger
    {
 
       
         public string UserName { get; set; }
         public string UserAadhar { get; set; }
         public string MobileNumber { get; set; }
         public string Email { get; set; }
         public string Password { get; set; }
         public string Address { get; set; }
         public string FoodType { get; set; }
         public string Gender { get; set; }
         public int WalletBalance { get; set; }

         public void Recharge(int amount){
            this.WalletBalance+=amount;
         }
         
        
    }
}