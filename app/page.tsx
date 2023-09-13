import styles from "./page.module.css";

import Gallery from "./gallery";

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const users = await getData();
  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
