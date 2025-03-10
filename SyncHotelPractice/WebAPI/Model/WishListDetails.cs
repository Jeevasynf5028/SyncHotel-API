using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Model
{
    public class WishListDetails
    {
    public string WishListID { get; set; }
    public string UserID { get; set; }
    public string RoomID { get; set; }
    public int PriceOfRoom { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }

    }
}