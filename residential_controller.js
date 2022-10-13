// let ElevatorID = 1
let floorRequestButtonID = 1 
let callButtonID = 1 

class Column {
    constructor(_id,  _amountOfFloors, _amountOfElevators) {
        this.ID = _id
        this.status = 'online'
        this.amountOfFlooors = _amountOfFloors
        this.amountOfElevators = _amountOfElevators
        this.elevatorList = []
        this.callButtonList = []
        this.createElevators( _amountOfFloors, _amountOfElevators)
        this.createCallButtons(_amountOfFloors)
       
    }
    
        createElevators(_amountOfFloors, _amountOfElevators){
            let elevatorId = 1
            for (let i =0; i < _amountOfElevators; i++){
                this.elevatorList.push(new Elevator(elevatorId, _amountOfFloors))
                elevatorId++
            }
       
        };
        
        
        createCallButtons(_amountOfFloors){
            let buttonfloor = 1
            let callButtonID = 1
            for (let i = 0; i < _amountOfFloors; i++){
                if (buttonfloor < _amountOfFloors) {
                    this.callButtonList.push( new CallButton(callButtonID, buttonfloor, 'up'))
                    callButtonID++
                }
               if ( buttonfloor > 1){
                    this.callButtonList.push( new CallButton(callButtonID, buttonfloor, 'down'))
                    callButtonID++
               }
                buttonfloor++
                console.log(this.callButtonList)
             }
            
             
        };

        requestElevator(floor , direction){
             let elevator = this.findElevator(floor, direction)
             elevator.floorRequestList.push(floor)
             elevator.sortFloorList()
             elevator.move()
                
             return elevator
             
        };


        findElevator(requestedFloor, requestedDirection){
            let bestElevatorInformation = {
                 bestElevator: null,
                 bestScore: 5,
                 referenceGap:  10000000,
            }
          
            
        
            this.elevatorList.forEach((elevator)=> {
                //The elevator is at my floor and going in the direction I want 
                    if (requestedFloor === elevator.currentFloor && elevator.status === 'stopped' && requestedDirection === elevator.direction){
                    bestElevatorInformation = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformation, requestedFloor, )
                    
                    }
                //The elevator is lower than me, is coming up and I want to go up
                    else if (requestedFloor > elevator.currentFloor && elevator.direction === 'up' && requestedDirection === elevator.direction){
                    bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformation, requestedFloor )

                    }
                //The elevator is higher than me, is coming down and I want to go down
                    else if (requestedFloor < elevator.currentFloor && elevator.direction === 'down' && requestedDirection === elevator.direction){
                    bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformation, requestedFloor)
            
                    } 
                //The elevator is idle
                    else if (elevator.status ==='idle'){
                    bestElevatorInformation = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformation, requestedFloor)
                
                    } 
                 //The elevator is not available, but still could take the call if nothing better is found
                     else{
                    bestElevatorInformation = this.checkIfElevatorIsBetter(4, elevator, bestElevatorInformation, requestedFloor)

                    } 
            
        });
         
           
    
                    return bestElevatorInformation.bestElevator
       }

       
       
       
       
       
       
       
        checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformation, floor){
            if (scoreToCheck <  bestElevatorInformation.bestScore){
                bestElevatorInformation.bestScore = scoreToCheck;
                bestElevatorInformation.bestElevator = newElevator;
                bestElevatorInformation.referenceGap = Math.abs(newElevator.currentFloor - floor);
            }
            else if (bestElevatorInformation.bestScore == scoreToCheck){
                let gap = Math.abs(newElevator.currentFloor - floor);
                 
                if (bestElevatorInformation.referenceGap > gap){
                    bestElevatorInformation.bestElevator = newElevator
                    bestElevatorInformation.referenceGap = gap
                }
            }

            return bestElevatorInformation
            
        }
};



class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.amountOfFlooors = _amountOfFloors
        this.status = 'status'
        this.currentFloor = 1
        this.direction =  'null'
        this.door = new Door(_id)
        this.floorRequestButtonList = []
        this.floorRequestList = []
        //this.sortFloorList()
        this.createFloorRequestButton(_amountOfFloors)
    }
    
        createFloorRequestButton(_amountOfFloors){
        let buttonfloor = 1
        let floorRequestButtonID = 1
            for (let i = 0; i < _amountOfFloors; i++) {
                 this.floorRequestButtonList.push( new FloorRequestButton(floorRequestButtonID, buttonfloor))
                 this.buttonFloor++
                 this.floorRequestsButtonId++
            }
                    
        };
            
        requestFloor(floor){
         this.floorRequestList.push(floor) 
         this.sortFloorList()
         this.move()
        };
        
            
    
    
    
        move(){
            while (this.floorRequestList.length != 0){
                let destination = this.floorRequestList[0]
                this.status = 'moving'
                if (this.currentFloor < destination){
                    this.direction = 'up'
                    this.sortFloorList()
                    while(this.currentFloor < destination){
                        this.screenDisplay = this.currentFloor
                        this.currentFloor++
                    }
                }
                else if (this.currentFloor >  destination){
                    this.direction = 'down'
                    this.sortFloorList()
                    while (this.currentFloor > destination){
                        this.screenDisplay = this.currentFloor
                        this.currentFloor--
                    }
                }
                this.status = 'stopped'
                this.floorRequestList.shift()
            };
            this.status = 'idle'
        }

    
    
        sortFloorList(){
            if (this.directionn = 'up' ){
                this.floorRequestList.sort(function(a, b){return a-b});
            }
            else if (this.directionn = 'down' ){
                this.floorRequestList.sort(function(a, b){return b-a});  //look up how to sort array and reverse sort
            }
        };



}






class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        this.floor = _floor
        this.status = 'status'
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _floor, _status) {
        this.ID = _id 
        this.status = 'status'
        this.floor = _floor
    }
}

class Door {
    constructor(_id, _status) {
        this.ID = _id
        this.status = 'status'
    }
}


















module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }