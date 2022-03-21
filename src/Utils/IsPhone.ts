const IsPhone = (phone: string): boolean => {
  const phoneNumber = phone.replace(/[^0-9]/g, "");
  if (/^((\+7|7|8)+([0-9]){10})$/.test(phoneNumber)) {
    return true;
  }
  return false;
};

export default IsPhone;
