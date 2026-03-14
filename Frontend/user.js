const BASE_URL = "http://localhost:8000";

window.onload = async () => {

    const response = await axios.get(`${BASE_URL}/users`);
    const userDom = document.getElementById('users');

    let htmlData = '<div>';

    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];

        htmlData += `
        <div>
            ${user.firstname} ${user.lastname}
            <a href="index.html?id=${user.id}">
                <button>Edit</button>
            </a>
            <button class="delete" data-id="${user.id}">Delete</button>
        </div>
        `;
    }

    htmlData += '</div>';

    userDom.innerHTML = htmlData;

    const deleteDom = document.getElementsByClassName('delete');

    for (let i = 0; i < deleteDom.length; i++) {
        deleteDom[i].addEventListener('click', async (event) => {

            const id = event.target.dataset.id;

            try {
                await axios.delete(`${BASE_URL}/users/${id}`);
                location.reload();
            } catch (error) {
                console.log("Error deleting user:", error);
            }

        });
    }
}