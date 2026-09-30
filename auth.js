const SUPABASE_URL = "https://aayjgnhecmwaynmxetvn.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_k48dtDWJlkDHQTnGC1avuQ_A5Ihq0S3";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function handleAuth(event) {
    event.preventDefault();

    const email = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;

    const isRegistering =
        document.getElementById("regTab")?.classList.contains("active");

    if (isRegistering) {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert("Ошибка регистрации: " + error.message);
            return;
        }

        alert("Регистрация прошла успешно! Проверьте email, если потребуется подтверждение.");
        console.log("Registered:", data);
    } else {
        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            alert("Ошибка входа: " + error.message);
            return;
        }

        alert("Вы успешно вошли!");
        console.log("Logged in:", data);
        closeAuthModal();
    }
}
