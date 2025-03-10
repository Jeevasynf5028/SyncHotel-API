using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class BookDetails
    {
        /*•	 (Auto increment-BID4000)
•	UserID
•	TotalPrice 
•	DateOfBooking
•	BookingStatus (Default, Initiated, Booked, Cancelled)
*/   
      public string BookingID { get; set; }
      public string UserID { get; set; }
      public int TotalPrice { get; set; }
      public DateTime DateofBooking { get; set; }
      public string BookingStatus { get; set; }

    }
}