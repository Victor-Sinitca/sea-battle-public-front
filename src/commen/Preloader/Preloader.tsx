import React, {FC} from "react";
import styles from './Preloader.module.css'


let Preloader:FC<{}> = (props) => {
        return <div>
            <div className={styles.preloader}>
                <div className={styles.spinner}></div>
            </div>
        </div>
}
export default Preloader;
