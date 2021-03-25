import React from "react";
import Preloader from "../../commen/Preloader/Preloader";
import s from "./PlaceBattle.module.css"
import ReturnSector from "../Common/SectorShip";
import DeskUser from "../DeskUser/DeskUser";
import {setShipFirstUser, setShipSecondUser, setShotFirstUser, setShotSecondUser} from "../../redux/battleMap-reduсer";


let PlaceBattle = (props) => {


    if (!props.firstUserMap) {
        let userMap = [], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i,
                        canClick:true
                    }}}}
        props.setFirstUserMap(userMap)
    }
    if (!props.secondUserMap) {
        let userMap = [[]], i, j
        for (i = 0; i < 10; i++) {
            userMap[i] = []
            for (j = 0; j < 10; j++) {
                userMap[i][j] = {
                    sector: {
                        ship: false,
                        shot: false,
                        x: j,
                        y: i,
                        canClick:true
                    }}}
            props.setSecondUserMap(userMap)
        }
    }

    if (!props.secondUserMap || !props.secondUserMap) return <Preloader/>

    const SettingShipFU=()=>{
        props.toggleSettingShip(true,true)
    }
    const NoSettingShipFU=()=>{
        props.toggleSettingShip(false,true)
    }
    const SettingShipSU=()=>{
        props.toggleSettingShip(true,false)
    }
    const NoSettingShipSU=()=>{
        props.toggleSettingShip(false,false)
    }





    return <div className={s.displayMapBattle}>
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={true} firstUserMap={props.firstUserMap}
                  secondUserMap={props.secondUserMap} setShipUser={props.setShipFirstUser}
                  setShotUser={props.setShotFirstUser} settingShip={props.settingShipFU}
                  secondUserShips={props.secondUserShips} firstUserShips={props.firstUserShips}/>
        <DeskUser toggleSettingShip={props.toggleSettingShip}  firstUser={false} firstUserMap={props.secondUserMap}
                  secondUserMap={props.firstUserMap} setShipUser={props.setShipSecondUser}
                  setShotUser={props.setShotSecondUser} settingShip={props.settingShipSU}
                  secondUserShips={props.firstUserShips} firstUserShips={props.secondUserShips}/>
{/*



        <div className={s.displayUserFire}>
            <div className={s.displayMap}>
                {props.firstUserMap.map(a => a.map(b =>
                        <ReturnSector firstDask={true} sector={b.sector}
                                      returnToClick={props.setShipFirstUser}
                                      toClick={true} settingShip={props.settingShipFU}/>
                    ))}
            </div>
            <div>
                <button className={(props.settingShipFU? s.buttonActive:null)} onClick={SettingShipFU}>Set ship</button>
                <button className={(!props.settingShipFU? s.buttonActive:null)} onClick={NoSettingShipFU}>Set fire</button>
            </div>
            <div className={s.displayDownBar}>
                <div>
                    <div>Ships with one cage</div>
                    <div>Ships with two cage</div>
                    <div>Ships with three cage</div>
                    <div>Ships with four cage</div>
                </div>
                <div>
                    <div>{props.firstUserShips.numberShips1}</div>
                    <div>{props.firstUserShips.numberShips2}</div>
                    <div>{props.firstUserShips.numberShips3}</div>
                    <div>{props.firstUserShips.numberShips4}</div>
                </div>
            </div>
        </div>
        <div className={s.displayUserShip}>
            <div className={s.displayMap}>
                {props.secondUserMap.map(a =>
                    a.map(b =>
                        <ReturnSector firstDask={false} sector={b.sector}
                                      returnToClick={props.setShotFirstUser}
                                      toClick={true} settingShip={props.settingShipFU}/>
                    )
                )}
            </div>
            <div> </div>
            <div className={s.displayDownBar}>
                <div>
                    <div>Ships with one cage</div>
                    <div>Ships with two cage</div>
                    <div>Ships with three cage</div>
                    <div>Ships with four cage</div>
                </div>
                <div>
                    <div>{props.secondUserShips.numberShips1}</div>
                    <div>{props.secondUserShips.numberShips2}</div>
                    <div>{props.secondUserShips.numberShips3}</div>
                    <div>{props.secondUserShips.numberShips4}</div>
                </div>
            </div>
        </div>
        <div className={s.displayUserFire}>
            <div className={s.displayMap}>
                {props.secondUserMap.map(a =>
                    a.map(b =>
                        <ReturnSector firstDask={true} sector={b.sector} returnToClick={props.setShipSecondUser}
                                      toClick={true} settingShip={props.settingShipSU}/>
                    )
                )}
            </div>
            <div>
                <button className={(props.settingShipSU? s.buttonActive:null)} onClick={SettingShipSU}>Set ship</button>
                <button className={(!props.settingShipSU? s.buttonActive:null)} onClick={NoSettingShipSU}>Set fire</button>
            </div>
            <div className={s.displayDownBar}>
                <div>
                    <div>Ships with one cage</div>
                    <div>Ships with two cage</div>
                    <div>Ships with three cage</div>
                    <div>Ships with four cage</div>
                </div>
                <div>
                    <div>{props.secondUserShips.numberShips1}</div>
                    <div>{props.secondUserShips.numberShips2}</div>
                    <div>{props.secondUserShips.numberShips3}</div>
                    <div>{props.secondUserShips.numberShips4}</div>
                </div>
            </div>
        </div>
        <div className={s.displayUserShip}>
            <div className={s.displayMap}>
                {props.firstUserMap.map(a =>
                    a.map(b =>
                        <ReturnSector firstDask={false} sector={b.sector} returnToClick={props.setShotSecondUser}
                                      toClick={true} settingShip={props.settingShipSU}/>
                    )
                )}
            </div>
            <div> </div>
            <div className={s.displayDownBar}>
                <div>
                    <div>Ships with one cage</div>
                    <div>Ships with two cage</div>
                    <div>Ships with three cage</div>
                    <div>Ships with four cage</div>
                </div>
                <div>
                    <div>{props.firstUserShips.numberShips1}</div>
                    <div>{props.firstUserShips.numberShips2}</div>
                    <div>{props.firstUserShips.numberShips3}</div>
                    <div>{props.firstUserShips.numberShips4}</div>
                </div>
            </div>
        </div>*/}
    </div>
}

export default PlaceBattle