using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;

namespace WebAPI.Controller
{
    [ApiController]
    [Route("api/synchotel/roomscontroller/")]
    public class RoomController : ControllerBase
    {
        

        //getting the room
        [HttpGet("get/room/{roomID}")]
        public IActionResult GetRoomDetail(string roomID)
        {
            var room = ApplicationDBContext.roomDetails.FirstOrDefault(item => item.RoomID == roomID);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpGet("allrooms")]//all rooms

        public IActionResult GetRooms()
        {
            return Ok(ApplicationDBContext.roomDetails);
        }

        //edit roomm
        [HttpPut("new/room/edit")]
        public IActionResult EditRoom(RoomDetails roomData)
        {
            var prod = ApplicationDBContext.roomDetails.FirstOrDefault(item => item.RoomID == roomData.RoomID);
            if (roomData == null)
            {
                return NotFound();
            }
            prod.RoomID=roomData.RoomID;
            prod.RoomType=roomData.RoomType;
            prod.RoomImage=roomData.RoomImage;
            prod.NumberOfBeds=roomData.NumberOfBeds;
            prod.PricePerDay=roomData.PricePerDay;

            return Ok();
        }
    
           //delete Items
        [HttpDelete("delete/{roomID}")]
        public IActionResult DeleteRoom(string roomID)
        {
            var room = ApplicationDBContext.roomDetails.Find(item => item.RoomID == roomID);
            if (room == null)
            {
                return NotFound();
            }
            ApplicationDBContext.roomDetails.Remove(room);
            return Ok();
        }


         //Adding new room
        [HttpPost("add/newRoom")]

        public IActionResult AddNewRoom([FromBody] RoomDetails room)
        {
            room.RoomID = "RID" + (ApplicationDBContext.roomDetails.Count + 2001);
            ApplicationDBContext.roomDetails.Add(room);
            return Ok(room.RoomID);
        }
    
    }
}