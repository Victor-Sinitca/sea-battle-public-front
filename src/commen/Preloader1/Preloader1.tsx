import React, {FC} from "react";
import styles from './Preloader1.module.css'


const Spinners = () => {
    return <>
        <div className={styles.spinnerPart}></div>
       {/* <div className={styles.spinnerPart2}></div>*/}
    </>
}


const Preloader1: FC<{}> = (props) => {
    return <div className={styles.preloader}>
        <div className={styles.spinner1}>
            <Spinners/>
        </div>
        <div className={styles.spinner3}>
            <Spinners/>
        </div>
        <div className={styles.spinner5}>
            <Spinners/>
        </div>
        <div className={styles.spinner7}>
            <Spinners/>
        </div>
        <div className={styles.spinner9}>
            <Spinners/>
        </div>
        <div className={styles.spinner11}>
            <Spinners/>
        </div>
        <div className={styles.spinner13}>
            <Spinners/>
        </div>

        <div className={styles.spinner15}>
            <Spinners/>
        </div>
        <div className={styles.spinner17}>
            <Spinners/>
        </div>
        <div className={styles.spinner19}>
            <Spinners/>
        </div>
        <div className={styles.spinner21}>
            <Spinners/>
        </div>
        <div className={styles.spinner23}>
            <Spinners/>
        </div>
    </div>

}
export default Preloader1;
