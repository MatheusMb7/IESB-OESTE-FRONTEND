import styles from './Heading.module.css';

export function Heading() {
  // A classe 'heading' agora é acessada como uma propriedade do objeto 'styles'
  return <h1 className={styles.heading}>Olá, Mundo!</h1>;
}