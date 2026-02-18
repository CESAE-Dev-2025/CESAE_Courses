import { useState } from "react";

function Contact() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Contato</h1>
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        </div>
    );
}

export default Contact;