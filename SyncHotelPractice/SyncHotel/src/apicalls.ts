import {  BookingDetails, RoomDetails, UserDetails, WishListDetails } from "./model";


    
export  async function  CheckUser(mailID:string):Promise<boolean>{
    let apiURL=`http://localhost:5163/api/synchotel/usercontroller/${mailID}`;
    let  response= await fetch(apiURL);
        if(!response.ok){
            throw Error("Failed to fetch data")
        }
        return  await response.json();
    
    
}

export async function AddNewUser(user:UserDetails):Promise<string> {
    let apiURL=`http://localhost:5163/api/synchotel/usercontroller/newUser/${user}`;
    let response=await fetch(apiURL,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify(user)
    });
    if(!response.ok){
        throw Error("Failed to add data");
    }
    return await response.text();


    
}

export async function GetIndividualUser(mailID: string, password: string): Promise<UserDetails | null> {
    let apiURL = `http://localhost:5163/api/synchotel/usercontroller/${mailID}/${password}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}

// get all  cart list
export async function FetchRooms():Promise<RoomDetails[]> {
    let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/allrooms`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

//selection Controller
export async function FetchRoomsByDate(formDate:Date,toDate:Date):Promise<RoomDetails[]> {
    let apiURL = `http://localhost:5163/api/synchotel/selectioncontroller/allrooms/${formDate}/${toDate}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}
// get room by ID
export async function GetIndividualRoom(roomID: string): Promise<RoomDetails | null> {
    let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/get/room/${roomID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns cart
    return await response.json();
}
//pass cart object type and edit via API
export async function EditRoomDetail(room:RoomDetails):Promise<void>{
    let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/new/room/edit`;
    let response= await fetch(apiURL,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(room)
    });
    if(!response.ok){
        throw new Error("Failed to update the data");
        
    }

}

export async function DeleteRoomDetail(roomID:string):Promise<void> {
    const response=await fetch(`http://localhost:5163/api/synchotel/roomscontroller/delete/${roomID}`,{
        method:'DELETE'
    });
    if(!response.ok){
        throw new Error('Failed to Delete the Item')
    }
    
}

//AddnewRoom by passing Room type obj
export async function AddNewRoom(room: RoomDetails): Promise<string> {
    let apiURL = "http://localhost:5163/api/synchotel/roomscontroller/add/newRoom";
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}


//Add item to cart list
export async function AddItemToCart(cartItem: WishListDetails): Promise<string> {
    let apiURL = "http://localhost:5163/api/synchotel/cartController/add/cartItem";
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}


//Fetch Cart Array [] by Customer ID
export async function FetchCarts(userID: string): Promise<WishListDetails[]> {
    let apiURL = `http://localhost:5163/api/synchotel/cartController/carts/${userID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}
//Fetch Cart Array [] by Customer ID
export async function FetchOneCart(cartID: string): Promise<WishListDetails> {
    let apiURL = `http://localhost:5163/api/synchotel/cartController/onecart/${cartID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}
//recharge the wallet
export async function RechargeWalletBalance(userID:string,amount:number) {

    let apiURL = `http://localhost:5163/api/synchotel/usercontroller/recharge/${userID}/${amount}`;
    let response=await fetch(apiURL,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(!response.ok){
        throw Error('failed to update data')

    }
    
    
}


//Delete the cart item for the customer
export async function DeleteCartDetail(userID: string, cartID: string) {
    const response = await fetch(`http://localhost:5163/api/synchotel/cartController/delete/newcart/${userID}/${cartID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete card');
    }
}

export async function UpdateCartData(cartData:WishListDetails) {
     let apiURL = "http://localhost:5163/api/synchotel/cartController/update/cartItem";
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
    });

    if (!response.ok) {
        throw new Error("Fail to update Cart Item");
    }
    return await response.text();
}


//Buying the single cartitem
export async function BuySingleItem(cartID:string,customerID:string) :Promise<string>{
    let apiURL=`http://localhost:5163/api/synchotel/bookingController/new/singleBooking/${cartID}/${customerID}`;
    let response=await fetch(apiURL,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        }

    });
    if(!response.ok){
        throw Error('failled to Buy the cart')

    }

    return await response.text();

}


export async function FetchAllBookings(customerID: string): Promise<BookingDetails[]> {
    let apiURL = `http://localhost:5163/api/synchotel/bookingController/fetchbookings/${customerID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return await response.json();
}

export async function CancelBooking(bookingID: string): Promise<string> {
    let apiURL = `http://localhost:5163/api/synchotel/bookingController/cancel/${bookingID}`;
    let response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error("Fail to Cancell Booking");
    }
    return await response.text();
}
