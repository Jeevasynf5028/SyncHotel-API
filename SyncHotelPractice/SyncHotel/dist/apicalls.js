var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function CheckUser(mailID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/usercontroller/${mailID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw Error("Failed to fetch data");
        }
        return yield response.json();
    });
}
export function AddNewUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/usercontroller/newUser/${user}`;
        let response = yield fetch(apiURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw Error("Failed to add data");
        }
        return yield response.text();
    });
}
export function GetIndividualUser(mailID, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/usercontroller/${mailID}/${password}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            return null;
        }
        //returns true if the customer is already exist
        return yield response.json();
    });
}
// get all  product list
export function FetchRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/allrooms`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
//selection Controller
export function FetchRoomsByDate(formDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/selectioncontroller/allrooms/${formDate}/${toDate}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
// get product by ID
export function GetIndividualRoom(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/get/room/${roomID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            return null;
        }
        //returns product
        return yield response.json();
    });
}
//pass product object type and edit via API
export function EditRoomDetail(room) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/roomscontroller/new/room/edit`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });
        if (!response.ok) {
            throw new Error("Failed to update the data");
        }
    });
}
export function DeleteRoomDetail(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5163/api/synchotel/roomscontroller/delete/${roomID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to Delete the Item');
        }
    });
}
//AddnewRoom by passing Room type obj
export function AddNewRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5163/api/synchotel/roomscontroller/add/newRoom";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        return yield response.text();
    });
}
//Add item to cart list
export function AddItemToCart(cartItem) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5163/api/synchotel/cartController/add/cartItem";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });
        if (!response.ok) {
            throw new Error("Fail to add data");
        }
        return yield response.text();
    });
}
//Fetch Cart Array [] by Customer ID
export function FetchCarts(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/cartController/carts/${userID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
//Fetch Cart Array [] by Customer ID
export function FetchOneCart(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/cartController/onecart/${cartID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Fail to fetch data");
        }
        return yield response.json();
    });
}
//recharge the wallet
export function RechargeWalletBalance(userID, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/usercontroller/recharge/${userID}/${amount}`;
        let response = yield fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error('failed to update data');
        }
    });
}
//Delete the cart item for the customer
export function DeleteCartDetail(userID, cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5163/api/synchotel/cartController/delete/newcart/${userID}/${cartID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete card');
        }
    });
}
export function UpdateCartData(cartData) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = "http://localhost:5163/api/synchotel/cartController/update/cartItem";
        let response = yield fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        });
        if (!response.ok) {
            throw new Error("Fail to update Cart Item");
        }
        return yield response.text();
    });
}
//Buying the single cartitem
export function BuySingleItem(cartID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/bookingController/new/singleBooking/${cartID}/${customerID}`;
        let response = yield fetch(apiURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw Error('failled to Buy the cart');
        }
        return yield response.text();
    });
}
export function FetchAllBookings(customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/bookingController/fetchbookings/${customerID}`;
        let response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return yield response.json();
    });
}
export function CancelBooking(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiURL = `http://localhost:5163/api/synchotel/bookingController/cancel/${bookingID}`;
        let response = yield fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error("Fail to Cancell Booking");
        }
        return yield response.text();
    });
}
