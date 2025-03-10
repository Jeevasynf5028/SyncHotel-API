using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Controller
{
    public class UserDetails:PersonalDetails
    {
        public string UserID { get; set; }
        //  public int WalletBalance { get; set; }
    }
}