import React from "react";
import styles from './Preloader.module.css'


let Preloader = (props) => {

        return <div>
            <div className={styles.preloader}>
                <div className={styles.spinner}></div>
            </div>
        </div>
}
export default Preloader;
