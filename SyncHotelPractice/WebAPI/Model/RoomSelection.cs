using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class RoomSelection
    {
   

      public string SelectionID { get; set; }
      public string WishListID { get; set; }
      public string BookingID { get; set; }
      public string RoomID { get; set; }
      public DateTime StayingDateFrom { get; set; }
      public DateTime StayingDateTo { get; set; }
      public int Price { get; set; }
      public float NumberOfDays { get; set; }
      public string BookingStatus { get; set; }


    }
}