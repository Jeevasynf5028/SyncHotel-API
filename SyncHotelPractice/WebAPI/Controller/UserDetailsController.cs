using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;


namespace WebAPI.Controller
{
    [ApiController]
    [Route("api/synchotel/usercontroller")]  
    public class UserDetailsController : ControllerBase
    {
        [HttpGet("{mailID}")]
        public IActionResult GetIndividualUser(string mailID)
        {
            bool isUserValid = ApplicationDBContext.userDetails.Any(user => user.Email.ToLower() == mailID.ToLower());
            return Ok(isUserValid);
        }

        [HttpGet("{mailID}/{password}")]
        public IActionResult GetUser(string mailID,string password){
            var user=ApplicationDBContext.userDetails.FirstOrDefault(user=>user.Email.ToLower()==mailID && user.Password.ToLower()==password);
            if(user==null){
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost("newuser/{user}")]
        public IActionResult AddNewUser([FromBody] UserDetails userdata){
            userdata.UserID="SF"+(ApplicationDBContext.userDetails.Count+1001);
            ApplicationDBContext.userDetails.Add(userdata); 
            return Ok(userdata.UserID);
        }
          


          [HttpPut("recharge/{userID}/{amount}")]//amount recharge
        public IActionResult RechargeWalletBalance(string userID, int amount)
        {
            var user = ApplicationDBContext.userDetails.FirstOrDefault(user => user.UserID == userID);
            if (user == null)
            {
                return NotFound();
            }
            user.Recharge(amount);//calling the method 
            return Ok();
        }


    }
}