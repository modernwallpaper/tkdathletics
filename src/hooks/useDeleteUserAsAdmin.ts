export const useDeleteUserAsAdmin = () => {
  const deleteUser = async (id: string) => {
    const req = await fetch("/api/user/admin/delete", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    });

    const data = await req.json();

    if(data.success) {
      sessionStorage.setItem("toastMessage", data.success);
      window.location.reload();
    }

    if(data.error) {
      sessionStorage.setItem("toastMessage", data.error);
      window.location.reload();
    }
  }

  return { deleteUser };
}
