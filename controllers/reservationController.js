import ReservationService from "../services/reservationService.js";
import {ReservationsStatus} from "../models/reservation.js";


const ReservationController = {
    addReservation: async function(req, res, next){
        try {
            let reservation = req.body;
            reservation.status = ReservationsStatus.New
            //TODO - Check the current available seat of the restaurant
            const  result = await ReservationService.addReservation(reservation);
            //TODO - Update the restaurant available seat
            if (result.modifiedCount > 0) {
                return res.json({success: true})
            }
            else {
                return res.json({success: false})
            }
        } catch (error) {
            next(error);
        }
    },
    updateReservation: async function(req, res, next){
        try {
            const {reservationId} = req.params;
            const {numberOfPeople, status} = req.body;
            const result = await ReservationService.updateReservation(reservationId, numberOfPeople, status);
            return res.json({success: true, data: result});
        } catch (error) {
            next(error);
        }
    },
    getReservationOfUser: async function(req, res, next){
        try {
            const {userId} = req.params;
            const result = await ReservationService.getReservationOfUser(userId);
            return res.json({success: true, data: result});
        } catch (error) {
            next(error);
        }
    },
}

export default ReservationController