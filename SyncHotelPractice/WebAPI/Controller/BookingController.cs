using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;

namespace WebAPI.Controller
{

    [ApiController]
    [Route("api/synchotel/bookingController/")]
    public class BookingController : ControllerBase
    {
        [HttpPut("new/singleBooking/{cartID}/{userID}")]  //single buy
        public IActionResult BuySingleItem(string cartID, string userID)
        {
            var cartItem = ApplicationDBContext.carts.Find(cart => cart.UserID == userID && cart.WishListID == cartID);
            string purchaseStatus = "nothing";
            if (cartItem == null)
            {
                return NotFound();
            }

            var customer = ApplicationDBContext.userDetails.Find(customer => customer.UserID == userID);
            var toAllowBook = true;
            foreach (var selectionData in ApplicationDBContext.selections)
            {
                if (selectionData.RoomID == cartItem.RoomID)
                {
                    if (selectionData.StayingDateTo < cartItem.FromDate || cartItem.ToDate < selectionData.StayingDateFrom)
                    {
                        //setting the data constrains
                       
                    }
                    else
                    {
                        //else to do nothing
                         toAllowBook = false; //if date constrains false then dont allow to booking
                    }
                }

            }//for loop ends

            if (toAllowBook)
            {
                string selectionID = "SID" + (ApplicationDBContext.selections.Count + 5001);
                TimeSpan diff = cartItem.ToDate - cartItem.FromDate;
                double days = diff.TotalDays;
                double TotalPriceOfBuy = (days * cartItem.PriceOfRoom);
                if (customer.WalletBalance >= TotalPriceOfBuy)
                {
                    string bookingID = "BID" + (4001 + ApplicationDBContext.bookings.Count);
                    //creat the booking Object and add it to the db
                    ApplicationDBContext.bookings.Add(new BookDetails { BookingID = bookingID, UserID = customer.UserID, TotalPrice = (int)TotalPriceOfBuy, DateofBooking = DateTime.Now, BookingStatus = "Booked" });
                    //add the roomselection object and add it to the db

                    var currentSeleciton = new RoomSelection { SelectionID = selectionID, WishListID = cartItem.WishListID, BookingID = bookingID, RoomID = cartItem.RoomID, StayingDateFrom = cartItem.FromDate, StayingDateTo = cartItem.ToDate, Price = cartItem.PriceOfRoom, NumberOfDays = (float)days, BookingStatus = "Booked" };
                    ApplicationDBContext.selections.Add(currentSeleciton);
                    purchaseStatus = $"Your Purchase is successful and your booink id is {bookingID} Selection ID is {currentSeleciton.SelectionID} \n Status  {currentSeleciton.BookingStatus} \n FromDate {currentSeleciton.StayingDateFrom} \n ToDate {currentSeleciton.StayingDateTo} \n Total PRICE{TotalPriceOfBuy} \n RoomID{currentSeleciton.RoomID}";
                }
                else
                {
                    purchaseStatus = "Insifficinet Balance to proceed Further. Recharge and try again";
                    //    return Ok(purchaseStatus);

                }

            }
            else
            {
                purchaseStatus = "Room Booked On this Data Try Different One";
                // return Ok(purchaseStatus);
            }

            return Ok(purchaseStatus);
        }



        [HttpGet("fetchbookings/{customerID}")]//all bookings of the customer

        public IActionResult GetBookings(string customerID)
        {
            List<BookDetails> bookings = new List<BookDetails>();
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.UserID == customerID)
                {
                    bookings.Add(booking);//add
                }
            });
            return Ok(bookings);//whole
        }



        [HttpGet("fetchbookings/get/{bookingID}")]  //booking  details

        public IActionResult GetBooking(string bookingID)
        {
            BookDetails booking1 = default;
            ApplicationDBContext.bookings.ForEach(booking =>
            {
                if (booking.BookingID == bookingID)
                {
                    booking1 = booking;
                }
            });
            return Ok(booking1);
        }



        //  let apiURL = `http://localhost:5163/api/synchotel/bookingController/cancelbooking/${bookingID}`;

        [HttpGet("cancel/{bookingID}")]
        public IActionResult CancelBooking(string bookingID)
        {
            var bookingItem = ApplicationDBContext.bookings.FindIndex(book => book.BookingID == bookingID);
            
            string ResponseBody = "Cancelled Succefully";
            if (bookingItem == -1)
            {
                ResponseBody = "unable to Cancell";
                return NotFound();
            }
            else
            {
                var bookOBJ = ApplicationDBContext.bookings[bookingItem];
                bookOBJ.BookingStatus = "Cancelled";
                ApplicationDBContext.bookings[bookingItem] = bookOBJ;
                return Ok(ResponseBody);
            }
        


        }

    }
}