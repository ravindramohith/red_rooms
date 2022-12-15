import React from 'react'

const RoomFeatures = ({ room }) => {
    return (
        <div class="features mt-5">
            <h3 class='mb-4'>Features:</h3>
            <div class='room-feature'>
                <i class="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                <p>{room.guestCapacity} Guests</p>
            </div>

            <div class='room-feature'>
                <i class="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                <p>{room.numOfBeds} Beds</p>
            </div>

            <div class='room-feature'>
                <i
                    class={room.breakfast ? "fa fa-check text-success" : "fa fa-times text-danger"}
                    aria-hidden="true"></i>
                <p>Breakfast</p>
            </div>
            <div class='room-feature'>
                <i
                    class={room.internet ? "fa fa-check text-success" : "fa fa-times text-danger"}
                    aria-hidden="true"></i>
                <p>Internet Connection</p>
            </div>
            <div class='room-feature'>
                <i
                    class={room.airConditioned ? "fa fa-check text-success" : "fa fa-times text-danger"}
                    aria-hidden="true"></i>
                <p>Air Conditioned</p>
            </div>
            <div class='room-feature'>
                <i
                    class={room.petsAllowed ? "fa fa-check text-success" : "fa fa-times text-danger"}
                    aria-hidden="true"></i>
                <p>Pets</p>
            </div>
            <div class='room-feature'>
                <i
                    class={room.roomCleaning ? "fa fa-check text-success" : "fa fa-times text-danger"}
                    aria-hidden="true"></i>
                <p>Room Cleaning</p>
            </div>
        </div>
    )
}

export default RoomFeatures