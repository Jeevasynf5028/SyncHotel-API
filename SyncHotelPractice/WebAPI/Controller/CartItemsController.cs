using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;

namespace WebAPI.Controller
{

    [ApiController]
    [Route("api/synchotel/cartController/")]
    public class CartItemsController : ControllerBase
    {
        //adding to car
        [HttpPost("add/cartItem")]
        public IActionResult AddNewCart([FromBody] WishListDetails cartItem)
        {
            cartItem.WishListID = "WSID" + (3001 + ApplicationDBContext.carts.Count);
            ApplicationDBContext.carts.Add(cartItem);
            return Ok(cartItem.WishListID);
        }
        

         //give card for customer id
        [HttpGet("onecart/{cartID}")]
        //Gives all the cart
        public IActionResult GetOneCart(string cartID)
        {
            
           var cartData= ApplicationDBContext.carts.FirstOrDefault(cartItem=> cartItem.WishListID==cartID);
            return Ok(cartData);
        }



        //give card for customer id
        [HttpGet("carts/{userID}")]
        //Gives all the cart
        public IActionResult GetCarts(string userID)
        {
            List<WishListDetails> carts = new List<WishListDetails>();
            ApplicationDBContext.carts.ForEach(card =>
            {

                if (card.UserID == userID)
                {
                    carts.Add(card);
                }
            });
            return Ok(carts);
        }


        [HttpDelete("delete/newcart/{userID}/{cartID}")]//delete the cart item
        public IActionResult DeleteTempCart(string userID, string cartID)
        {
            var cart = ApplicationDBContext.carts.Find(cart => cart.WishListID == cartID && cart.UserID == userID);
            if (cart == null)
            {
                return NotFound();
            }
            ApplicationDBContext.carts.Remove(cart);
            return Ok();
        }

        //adding to car
        [HttpPost("update/cartItem")]
        public IActionResult UpdateNewCart([FromBody] WishListDetails cartItem)
        {
           var cart = ApplicationDBContext.carts.FindIndex(cart => cart.WishListID == cartItem.WishListID && cart.UserID == cartItem.UserID);
            
            if (cart == -1)
            {
                return NotFound();
            }
            // cart=cartItem;
            ApplicationDBContext.carts[cart]=cartItem;
            return Ok(cartItem.WishListID);
        }
        

    }
}