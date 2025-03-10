export interface UserDetails{
    userID:string;
    userName:string;
    userAadhar:string;
    mobileNumber:string;
    email:string;
    password:string;
    address:string;
    foodType :string;
    walletBalance :Number;
gender:string;
}


export interface RoomDetails{
    
    roomID:string,
    roomType:string,
    numberOfBeds:number,
    roomImage:string,
    pricePerDay:number
}

export interface WishListDetails{
    /**•	 public string WishListID { get; set; }
    public string UserID { get; set; }
    public string RoomID { get; set; }
    public int PriceOfRoom { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
 */
       userID:string,
       roomID:string,
       priceOfRoom:number,
       fromDate:Date,
       toDate:Date,
       wishListID:string,
}

export interface BookingDetails{
      bookingID:string;
      userID:string;
      totalPrice:string;
      dateofBooking:Date;
      bookingStatus:string;

}