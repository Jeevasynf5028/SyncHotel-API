import { RoomDetails, UserDetails, WishListDetails } from "./model";
import * as APICALLS from "./apicalls.js";

//getting elements by IDs
var box = document.getElementById("box") as HTMLDivElement;
const signIn = document.getElementById("signIn") as HTMLDivElement;
const signUp = document.getElementById("signUp") as HTMLDivElement;

var signInButton = document.getElementById("signInButton") as HTMLDivElement;
var signUpButton = document.getElementById("signUpButton") as HTMLDivElement;

const homePage = document.getElementById("homePage") as HTMLDivElement;
const menu = document.getElementById("menu") as HTMLDivElement;
const roomProfilePage = document.getElementById("RoomProfilePage") as HTMLDivElement;
const editRoomPage = document.getElementById("editRoom") as HTMLDivElement;
const addNewRoomPage = document.getElementById("addNewRoom") as HTMLDivElement;
const walletRechargePage = document.getElementById("walletRechargePage") as HTMLDivElement;
const takeRoomPage = document.getElementById("TakeRoomPage") as HTMLDivElement;
const userProfilePage = document.getElementById("UserProfilePage") as HTMLDivElement;
const customerCartItemsPage = document.getElementById("CustomerCartItemsPage") as HTMLDivElement;
const orderHistoryPage = document.getElementById("OrderHistoryPage") as HTMLDivElement;

const dateEdit = document.getElementById("dateEdit") as HTMLDivElement;
const dategetting = document.getElementById("dategetting") as HTMLDivElement;

var currentCustomer: UserDetails;
function displayNone(): void {
    box.style.display = "none";
    signIn.style.display = "none";
    signUp.style.display = "none";
    homePage.style.display = "none";
    addNewRoomPage.style.display = "none";
    editRoomPage.style.display = "none";
    walletRechargePage.style.display = "none";
    takeRoomPage.style.display = "none";
    roomProfilePage.style.display = "none";


    userProfilePage.style.display = "none";
    customerCartItemsPage.style.display = "none";
    dateEdit.style.display = "none";
    dategetting.style.display = "none";

    orderHistoryPage.style.display = "none";


    // menu.style.display="none";
}

async function signUpPage() {
    displayNone();
    box.style.display = "block";
    signUp.style.display = "block";

    signInButton.style.background = "none";
    signUpButton.style.background = "rgb(247, 191, 113)";


}
async function signInPage() {
    displayNone();
    box.style.display = "block";
    signIn.style.display = "block";
    signInButton.style.background = "rgb(247, 191, 113)";
    signUpButton.style.background = "none";

}

async function submitForm(e: Event) {
    alert("inside the submit Form")
    e.preventDefault();
    var name = (document.getElementById("userName") as HTMLInputElement).value;
    var mobile = (document.getElementById("mobile") as HTMLInputElement).value;
    var aadhar = (document.getElementById("aadhar") as HTMLInputElement).value;

    var email = (document.getElementById("email") as HTMLInputElement).value;
    var password = (document.getElementById("password1") as HTMLInputElement).value;
    var address = (document.getElementById("address") as HTMLInputElement).value;
    var gender = (document.getElementById("gender") as HTMLInputElement).value;
    var foodtype = (document.getElementById("foodType") as HTMLInputElement).value;
    var walletbalance = parseInt((document.getElementById("walletBalance") as HTMLInputElement).value);

    var isavail: boolean = await APICALLS.CheckUser(email);

    if (!isavail) {

        let newUser: string = await APICALLS.AddNewUser({ userID: "", userName: name, mobileNumber: mobile, email: email, userAadhar: aadhar, password: password, address: address, foodType: foodtype, walletBalance: walletbalance, gender: gender });
        //resetting form data
        (document.getElementById("userName") as HTMLInputElement).value = "";
        (document.getElementById("aadhar") as HTMLInputElement).value = "";

        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("password1") as HTMLInputElement).value = "";
        (document.getElementById("address") as HTMLInputElement).value = "";
        (document.getElementById("gender") as HTMLInputElement).value = "";
        (document.getElementById("foodType") as HTMLInputElement).value = "";
        ((document.getElementById("walletBalance") as HTMLInputElement).value) = "";
        alert(`Registration Successfully.Your UserID is${newUser}`)
    } else {
        var signInBorder = document.getElementById("signUP") as HTMLDivElement;
        signInBorder.style.border = "2px solid red";
        alert('alrady exist');

    }


}
////Sign In method
async function signInSubmit(e: Event) {
    e.preventDefault();
    var email = document.getElementById("email1") as HTMLInputElement;
    var pass = document.getElementById("password2") as HTMLInputElement;
    if (!email.value || !pass.value) {
        alert("email and pass not be empty")
        return
    }
    var user: UserDetails | null = await APICALLS.GetIndividualUser(email.value, pass.value);
    if (user == null) {
        alert("invalid Email or password")
    } else {
        // alert("valid cutomer")
        currentCustomer = user;
        home();
        // alert("valid user")
        email.value = ""
        pass.value = ""
    }

}
async function home() {
    // alert("inside the Home")
    displayNone();
    homePage.style.display = "block";
    menu.style.display = "block";
    var welcome = document.getElementById("welcome") as HTMLHeadingElement;
    welcome.innerHTML = "Welcome " + currentCustomer.userName;


}
async function NewRoomPage() {
    addNewRoomPage.style.display = "block";
    editRoomPage.style.display = "none";
}
async function CustomerDetails() {



    displayNone();
    userProfilePage.style.display = "block";
    document.getElementById('user-profile-card')!.innerHTML = `
    
    <table class="profile-table">
        <tr>
            <th>User ID</th> <td>${currentCustomer.userID}</td>
        </tr>
        <tr>
            <th>User Name</th>  <td>${currentCustomer.userName}</td>
        </tr>
        <tr>
            <th>Email</th>  <td>${currentCustomer.email}</td>
        </tr>
        <tr>
            <th>Gender</th>  <td>${currentCustomer.gender}</td>
        </tr>
        <tr>
            <th>Mobile Number</th>  <td>${currentCustomer.mobileNumber}</td>
        </tr>
        <tr>
            <th>FootType</th>  <td>${currentCustomer.foodType}</td>    
        </tr>
        <tr>
            <th>UserAadhar</th> <td>${currentCustomer.userAadhar}</td>
        </tr>
        <tr>
            <th>Wallet Balance</th> <td>${currentCustomer.walletBalance}</td>
        </tr>
    </table>
    `;
}

async function ShowRoomDetails() {

    displayNone();
    roomProfilePage.style.display = "block";

    var rooms = await APICALLS.FetchRooms();
    var roomTable = document.getElementById("room-table") as HTMLTableSectionElement;
    roomTable.innerHTML = `
                <tr>
                    <th>Room ID</th> <th>Room Image</th> <th>RoomType</th>  <th>NumberOfBeds</th>  <th>PricePerDay</th> <th>Action</th>
                </tr>`;


    rooms.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <tr>
                <td>${room.roomID}</td>
                <td><img src="${room.roomImage}">Image</td>  
                <td>${room.roomType}</td> <td>${room.numberOfBeds}</td>
                <td>${room.pricePerDay}</td>
                <td>
                    <button onclick="editChosenRoom('${room.roomID}')">Edit</button>
                    <button onclick="deleteRoom('${room.roomID}')">Delete</button>
                </td>
                </tr> `;
        roomTable.appendChild(row);
    });
}
var currentRoom: RoomDetails | null;
async function editChosenRoom(roomID: string) {
    editRoomPage.style.display = "block";
    addNewRoomPage.style.display = "none";
    currentRoom = await APICALLS.GetIndividualRoom(roomID);
    if (currentRoom != null) {
        (document.getElementById("editroomType") as HTMLInputElement).value = currentRoom.roomType;
        (document.getElementById("editroomNumberOfBeds") as HTMLInputElement).value = String(currentRoom.numberOfBeds);
        (document.getElementById("editroomPrice") as HTMLInputElement).value = String(currentRoom.pricePerDay);
        (document.getElementById("editroomPhoto") as HTMLInputElement).value = String(currentRoom.roomImage);
    }
    else {
        alert("Room not found");
    }
}
async function editRoom(e: Event) {
    e.preventDefault();
    if (currentRoom != null) {

        var RoomType = (document.getElementById("editroomType") as HTMLInputElement).value;
        var NumberOfBeds = parseFloat((document.getElementById("editroomNumberOfBeds") as HTMLInputElement).value);
        var Price = parseFloat((document.getElementById("editroomPrice") as HTMLInputElement).value);
        var RoomPhoto = (document.getElementById("editroomPhoto") as HTMLInputElement).files?.[0];
        let roomPhotoBase64 = "";
        if (RoomPhoto) {
            roomPhotoBase64 = await convertToBase64(RoomPhoto); // Convert the image to Base64
        }
        await APICALLS.EditRoomDetail({ roomID: currentRoom.roomID, roomType: RoomType, numberOfBeds: NumberOfBeds, pricePerDay: Price, roomImage: roomPhotoBase64 });
        alert("Room modified successfully.");
        //resetting values
        (document.getElementById("editroomType") as HTMLInputElement).value = "";
        (document.getElementById("editroomNumberOfBeds") as HTMLInputElement).value = "";
        (document.getElementById("editroomPrice") as HTMLInputElement).value = "";
        (document.getElementById("editroomPhoto") as HTMLInputElement).value = "";
        ShowRoomDetails();
    }
}

async function deleteRoom(roomID: string) {
    const deleteRoom = confirm('Do you want to delete this room');
    if (deleteRoom) {
        await APICALLS.DeleteRoomDetail(roomID);

    }
    ShowRoomDetails();
}
async function addRoom(e: Event) {
    e.preventDefault();
    var RoomType = (document.getElementById("roomType") as HTMLInputElement).value;
    var NumberOfBeds = parseFloat((document.getElementById("roomNumberOfBeds") as HTMLInputElement).value);
    var Price = parseFloat((document.getElementById("roomPrice") as HTMLInputElement).value);

    var roomPhotoFile = (document.getElementById("roomPhoto") as HTMLInputElement).files?.[0];
    let roomPhotoBase64 = "";
    if (roomPhotoFile) {
        roomPhotoBase64 = await convertToBase64(roomPhotoFile); // Convert the image to Base64
    }
    let newRoom: string = await APICALLS.AddNewRoom({ roomID: "", roomType: RoomType, numberOfBeds: NumberOfBeds, pricePerDay: Price, roomImage: roomPhotoBase64 });
    (document.getElementById("roomType") as HTMLInputElement).value = "";
    (document.getElementById("roomNumberOfBeds") as HTMLInputElement).value = "";
    (document.getElementById("roomPrice") as HTMLInputElement).value = "";
    (document.getElementById("roomPhoto") as HTMLInputElement).value = "";
    alert(`Room added successfully. Room ID is ${newRoom}`);

    ShowRoomDetails();
}
//function for recharge
async function deposit() {
    alert("inside Deposit")
    var amount1 = (document.getElementById("amount") as HTMLInputElement).value;
    await APICALLS.RechargeWalletBalance(currentCustomer.userID, Number(amount1));
    var customer: UserDetails | null = await APICALLS.GetIndividualUser(currentCustomer.email, currentCustomer.password);
    currentCustomer = <UserDetails>customer;//update the customer object
    (document.getElementById("amount") as HTMLInputElement).value = "";
    alert(`Recharge Successful. Your current balance is ${currentCustomer.walletBalance}`);
    RechargeWallet();
}
//load page
//Wallet Recharge Page
function RechargeWallet() {
    displayNone();
    walletRechargePage.style.display = "block";
    (document.getElementById("currentBalance") as HTMLHeadingElement).innerHTML = `Available Balance : ${currentCustomer.walletBalance}`;
}

async function convertToBase64(file: File): Promise<string> {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file)
    });

}

async function LogOut() {
    alert("inside the Log out");
    displayNone();
    box.style.display = "block";
    signIn.style.display = "block";
    menu.style.display = "none";
}


const roomContainer = document.getElementById('room-container') as HTMLDivElement;

function displayRooms(rooms: RoomDetails[]) {
    rooms.forEach(room => {
        //create div to add the datas from the api
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';

        // Create room name
        const roomID = document.createElement('h2');
        roomID.textContent = room.roomID;
        roomDiv.appendChild(roomID);


        // Create image
        const roomImage = document.createElement('img');
        roomImage.src = room.roomImage;
        roomImage.alt = room.roomID;
        roomDiv.appendChild(roomImage);



        // Create room details  price
        const roomPrice = document.createElement('p');
        roomPrice.textContent = ` Price: ${room.pricePerDay}`;
        roomDiv.appendChild(roomPrice);

        // Create button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        roomDiv.appendChild(button);

        button.onclick = function () {
            AddToCart(room.roomID);
        }

        // Append to the container
        roomContainer.appendChild(roomDiv);//parent container
    });
}

//user wish to add
async function AddToCart(roomID: string) {

    var fromDate = document.getElementById("fromDate") as HTMLInputElement;
    var dateSplit: string[] = fromDate.value.split("-");
    var toDate = document.getElementById("toDate") as HTMLInputElement;
    var dateSplit2: string[] = toDate.value.split("-");
    var formDateInput = new Date(Number(dateSplit[0]), (Number(dateSplit[1]) - 1), Number(dateSplit[2]));
    var toDateInput = new Date(Number(dateSplit2[0]), (Number(dateSplit2[1]) - 1), Number(dateSplit2[2]));


    var selectedRoom: RoomDetails | null = await APICALLS.GetIndividualRoom(roomID);
    if (selectedRoom != null) {
        var cartID: string = await APICALLS.AddItemToCart({ wishListID: "", userID: currentCustomer.userID, roomID: selectedRoom.roomID, fromDate: formDateInput, toDate: toDateInput, priceOfRoom: selectedRoom.pricePerDay });
        alert(`${selectedRoom.roomID} added to cart list . Your CartID is ${cartID}`);

    }
    TakeRoom();
}

const cartItemContainer = document.getElementById('cart-item-div') as HTMLDivElement;
const purchaseAllButton = document.getElementById("new-order-btn") as HTMLButtonElement;
const totalPriceText = document.getElementById("showTotalPrice") as HTMLHeadingElement;
const emptyCartDiv = document.getElementById("empty-cart") as HTMLDivElement;
//function for taking rooms
async function CartItems() {
    displayNone();
    customerCartItemsPage.style.display = "block";
    var orders = await APICALLS.FetchCarts(currentCustomer.userID);
    cartItemContainer.innerHTML = '';
    emptyCartDiv.innerHTML = '';
    displayCartItems(orders);
}

async function DeleteTempCartDetail(cartID: string) {
    const deleteCart = confirm('Do you want to delete this cart');
    if (deleteCart) {
        await APICALLS.DeleteCartDetail(currentCustomer.userID, cartID);
        alert("Order deleted successfully.");
        CartItems();
    }
}

var currentCart: WishListDetails;
async function ModifyCartCount(cartID: string) {

    var editCart = document.getElementById("dateEdit") as HTMLInputElement;
    // editCart.style.display="block";


    currentCart = await APICALLS.FetchOneCart(cartID);
    var fromDate = document.getElementById("fromDateEdit") as HTMLInputElement;
    var dateSplit: string[] = fromDate.value.split("-");
    var toDate = document.getElementById("toDateEdit") as HTMLInputElement;
    var dateSplit2: string[] = toDate.value.split("-");
    var formDateInput = new Date(Number(dateSplit[0]), (Number(dateSplit[1]) - 1), Number(dateSplit[2]));
    var toDateInput = new Date(Number(dateSplit2[0]), (Number(dateSplit2[1]) - 1), Number(dateSplit2[2]));

    currentCart.fromDate = formDateInput;
    currentCart.toDate = toDateInput;


    await APICALLS.UpdateCartData(currentCart);
    alert('cart Modified Successfully.');

    // editCart.style.display="none";


    CartItems();
}

async function BuySingleCartItem(cartID: string) {
    var orderConfirmation = await APICALLS.BuySingleItem(cartID, currentCustomer.userID);
    currentCustomer = <UserDetails>await APICALLS.GetIndividualUser(currentCustomer.email, currentCustomer.password);
    alert(orderConfirmation);
    //deleteing the added cart items
    await APICALLS.DeleteCartDetail(currentCustomer.userID, cartID);
    CartItems();
}
async function displayCartItems(carts: WishListDetails[]) {
    var totalPrice: number = 0;
    const emptyCart = document.createElement('h2');
    if (carts.length == 0) {
        //is len is 0 then no item present
        emptyCart.textContent = 'Cart Wish List is Empty';
        emptyCart.className = 'empty';
        purchaseAllButton.style.display = "none";
        totalPriceText.style.display = "none";
        emptyCartDiv.appendChild(emptyCart);
    }
    else {
        //else show the details
        emptyCartDiv.innerHTML = '';
        emptyCart.textContent = '';
        // purchaseAllButton.style.display = "block";
        totalPriceText.style.display = "block";
        dateEdit.style.display = "block";
        
        //traverse the cards
        for (const cart of carts) {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart';

            var room = await APICALLS.GetIndividualRoom(cart.roomID);
            //get cart is present or not
            if (room != null) {
                //is not null generate the html
                const imageDiv = document.createElement('div');
                imageDiv.className = 'cart-div';
                const roomImage = document.createElement('img');
                roomImage.src = room.roomImage;
                roomImage.alt = room.roomType;
                imageDiv.appendChild(roomImage);
                cartItemDiv.appendChild(imageDiv);

                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'cart-div';
                const roomType = document.createElement('h2');
                const roomBed = document.createElement('p');
                const roomPrice = document.createElement('p');

                const fromDate = document.createElement('p');
                const toDate = document.createElement('p');

                roomType.textContent=`RoomType: ${room.roomType}`;
                roomBed.textContent=`Room Bed COUNT: ${room.numberOfBeds}`;
                roomPrice.textContent=`Room Price PerDay: ${room.pricePerDay}`;
                // fromDate.textContent = cart.fromDate.toLocaleString();
                
                fromDate.textContent=`From Date of Booking: ${cart.fromDate}`;
                // toDate.textContent = cart.toDate.toLocaleString();
            
                toDate.textContent=`To Date of Booking: ${cart.toDate}`;


                // roomType.textContent = room.roomType;
                roomPrice.textContent = `Price of Room ONly: $${cart.priceOfRoom}`;
                detailsDiv.appendChild(roomType);
                detailsDiv.appendChild(fromDate);
                detailsDiv.appendChild(toDate);
                detailsDiv.appendChild(roomBed);
                detailsDiv.appendChild(roomPrice);

                const modifyButton = document.createElement('button');
                modifyButton.textContent = 'Modify';
                modifyButton.onclick = () => {

                    ModifyCartCount(cart.wishListID); //call the modify the cart
                };


                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => {

                    DeleteTempCartDetail(cart.wishListID);//call the delete
                };

                const outOfStock = document.createElement('p');
                const PriceOfCart = document.createElement('p');



                const buyButton = document.createElement('button');
                buyButton.textContent = 'BOOK RooM';
                buyButton.disabled = false;
                buyButton.style.backgroundColor = "#28a745";
                buyButton.style.cursor = 'allowed';
                var fromDataCart = new Date(cart.fromDate);
                var toDateCart = new Date(cart.toDate);

                let diff = Math.abs(toDateCart.getTime() - fromDataCart.getTime());
                let timevalue = diff / (1000 * 60 * 60 * 24)
               

                


                totalPrice =totalPrice+(timevalue * cart.priceOfRoom);
                PriceOfCart.textContent = `Price of This Cart Alone: $${timevalue * cart.priceOfRoom}`;
                outOfStock.textContent = '';
                detailsDiv.appendChild(buyButton);
                buyButton.onclick = () => {
                    BuySingleCartItem(cart.wishListID); //call the buyfunction
                };


                     
                detailsDiv.appendChild(modifyButton); //adding the button
                detailsDiv.appendChild(deleteButton); //adding the button

                detailsDiv.appendChild(PriceOfCart); // label to denote
                cartItemDiv.appendChild(detailsDiv);


                cartItemContainer.appendChild(cartItemDiv);//add cart one by one
            }
        }
        
    }
    // totalPriceText.innerHTML = `Total Price: $${totalPrice}`;
}

async function TakeRoom() {
    displayNone();
    takeRoomPage.style.display = "block";
    dategetting.style.display="block";

    var rooms = await APICALLS.FetchRooms();

    roomContainer.innerHTML = '';
    displayRooms(rooms);


}

const billContentDiv = document.getElementById('bill-content') as HTMLDivElement;
async function OrderHistory() {
    displayNone();
    orderHistoryPage.style.display = "block";
    billContentDiv.innerHTML = '';
    var bookings = await APICALLS.FetchAllBookings(currentCustomer.userID);
    var bookingTable = document.getElementById("booking-table") as HTMLTableSectionElement;
    if (bookings.length == 0) {
        bookingTable.innerHTML = '';
        const emptyCart = document.createElement('h2');
        emptyCart.textContent = 'No Bookings Found';
        emptyCart.className = 'empty';
        billContentDiv.appendChild(emptyCart);
    }
    else {

        bookingTable.innerHTML = `
                <tr>
                    <th>Booking ID</th>  <th>Total Price</th> <th>Date Of Booking</th> <th>Booking Status</th> 
                </tr>
    `;
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            if(booking.bookingStatus=="Booked"){
                row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateofBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="CancelBookingItem('${booking.bookingID}')">Cancel Cooking</button>
                    </td>
                </tr>
        `;
            bookingTable.appendChild(row);
            }else{
                row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateofBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="CancelBookingItem('${booking.bookingID}')" style="background-color: rgb(211, 69, 30);" disabled>Cancel Cooking</button>
                    </td>
                </tr>
        `;        bookingTable.appendChild(row);
            }
           

        });
    }
}
async function CancelBookingItem(bookingID:string) {
    var responseItem= await APICALLS.CancelBooking(bookingID);
    alert(responseItem);

    OrderHistory();//refreshing
    
}
const functions = { signInPage, signUpPage, displayNone, submitForm, signInSubmit, home, CustomerDetails, ShowRoomDetails, editChosenRoom, editRoom, deleteRoom, addRoom, NewRoomPage, deposit, RechargeWallet, LogOut, TakeRoom, AddToCart, CartItems, displayCartItems, DeleteTempCartDetail, BuySingleCartItem, OrderHistory,CancelBookingItem,...APICALLS }
Object.assign(window, functions);

