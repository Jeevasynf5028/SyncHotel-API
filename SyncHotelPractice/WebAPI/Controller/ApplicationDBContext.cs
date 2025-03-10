using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Controller
{
    public class ApplicationDBContext
    {
        public static List<UserDetails> userDetails = new List<UserDetails>(){
            new UserDetails{
                UserID="SF1001",
                UserName="Ravichandran",
                MobileNumber="995875777",
                UserAadhar="347777378383",
                Email="ravi@gmail.com",
                Address="Chennai",
                FoodType="Veg",
                Gender="Male",
                Password="11",
                WalletBalance=5000
            },
             new UserDetails{
                UserID="SF1002",
                UserName="Baskaran",
                MobileNumber="995875777",
                UserAadhar="474777477477",
                Email="baskar@gmail.com",
                Address="Chennai",
                FoodType="NonVeg",
                Gender="Male",
                Password="11",
                WalletBalance=6000
            },

        };


        public static List<RoomDetails> roomDetails = new List<RoomDetails>()
        {

            new RoomDetails{ RoomID="RID2001",RoomType="Standard",NumberOfBeds=2,PricePerDay=500 ,RoomImage="./Images/room1.png"},
            new RoomDetails{ RoomID="RID2002",RoomType="Standard",NumberOfBeds=4,PricePerDay=700,RoomImage="./Images/room1.png"},
            new RoomDetails{ RoomID="RID2003",RoomType="Delux",NumberOfBeds=2,PricePerDay=1000,RoomImage="./Images/room2.png"},
            new RoomDetails{ RoomID="RID2004",RoomType="Suit",NumberOfBeds=2,PricePerDay=2000,RoomImage="./Images/room1.png"},
            new RoomDetails{ RoomID="RID2005",RoomType="Suit",NumberOfBeds=4,PricePerDay=2500,RoomImage="./Images/room1.png"},
            };

        public static List<RoomSelection> selections = new List<RoomSelection>()
        {

                new RoomSelection{
                    SelectionID="SID5001",
                    WishListID="WSID3001",
                    BookingID="BID4001",
                    RoomID="RID2001",
                    StayingDateFrom=new DateTime(2024,11,11),
                    StayingDateTo=new DateTime(2024,11,12),
                    Price=750,
                    NumberOfDays=1.5f,
                    BookingStatus="Booked"
                },
                new RoomSelection{
                    SelectionID="SID5002",
                    WishListID="WSID3002",
                    BookingID="BID4001",
                    RoomID="RID2002",
                    StayingDateFrom=new DateTime(2024,11,11),
                    StayingDateTo=new DateTime(2024,11,12),
                    Price=750,
                    NumberOfDays=1,
                    BookingStatus="Booked"
                },
                new RoomSelection{
                    SelectionID="SID5003",
                    WishListID="WSID3003",
                    BookingID="BID4002",
                    RoomID="RID2003",
                    StayingDateFrom=new DateTime(2024,11,12),
                    StayingDateTo=new DateTime(2024,11,13),
                    Price=750,
                    NumberOfDays=1,
                    BookingStatus="Cancelled"
                }

            };



     public static List<WishListDetails> carts=new(){
        new WishListDetails{WishListID="WSID3001",UserID="SF1001",RoomID="RID2001",PriceOfRoom=750,FromDate=new DateTime(2024,11,16),ToDate=new DateTime(2024,11,18)},
        new WishListDetails{WishListID="WSID3002",UserID="SF1001",RoomID="RID2002",PriceOfRoom=700,FromDate=new DateTime(2024,11,12),ToDate=new DateTime(2024,11,13)},
        new WishListDetails{WishListID="WSID3003",UserID="SF1002",RoomID="RID2001",PriceOfRoom=750,FromDate=new DateTime(2025,2,28),ToDate=new DateTime(2025,02,28)}

     };

     public static List<BookDetails> bookings=new(){
        new BookDetails{
             BookingID="BID4001",
             UserID="SF1001",
             TotalPrice=1450,
             DateofBooking=new DateTime(2024,11,10),
             BookingStatus="Booked"             
        },
        new BookDetails{
             BookingID="BID4002",
             UserID="SF1002",
             TotalPrice=2000,
             DateofBooking=new DateTime(2024,11,10),
             BookingStatus="Cancelled"             
        }

    };
    
    
    }

    
}