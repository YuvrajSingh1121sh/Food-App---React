import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Edit3,
  LogOut,
  MapPin,
  Package,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  User,
  X,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] =
    useState("profile");

  const [addresses, setAddresses] =
    useState([]);

  const [paymentMethods, setPaymentMethods] =
    useState([]);

  const [orders, setOrders] = useState([]);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const [showPaymentForm, setShowPaymentForm] =
    useState(false);

  const [editingProfile, setEditingProfile] =
    useState(false);

  const [addressForm, setAddressForm] = useState({
    label: "Home",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    type: "UPI",
    details: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "foodiehub-logged-in"
      ) === "true";

    if (!loggedIn) {
      navigate("/login", { replace: true });
      return;
    }

    loadProfileData();

    const handleLoginUpdate = () => {
      loadProfileData();
    };

    window.addEventListener(
      "loginUpdated",
      handleLoginUpdate
    );

    return () => {
      window.removeEventListener(
        "loginUpdated",
        handleLoginUpdate
      );
    };
  }, [navigate]);

  const loadProfileData = () => {
    const savedUser = JSON.parse(
      localStorage.getItem(
        "foodiehub-user"
      ) || "null"
    );

    setUser(savedUser);

    if (savedUser) {
      setEditForm({
        name: savedUser.name || "",
        phone: savedUser.phone || "",
        email: savedUser.email || "",
      });
    }

    const savedAddresses = JSON.parse(
      localStorage.getItem(
        "foodiehub-addresses"
      ) || "[]"
    );

    const savedPayments = JSON.parse(
      localStorage.getItem(
        "foodiehub-payment-methods"
      ) || "[]"
    );

    const savedOrders = JSON.parse(
      localStorage.getItem(
        "foodiehub-orders"
      ) || "[]"
    );

    setAddresses(savedAddresses);
    setPaymentMethods(savedPayments);
    setOrders(savedOrders);
  };

  /*
    First letter of user's name
  */

  const profileInitial = useMemo(() => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .trim()
      .charAt(0)
      .toUpperCase();
  }, [user]);

  /*
    Save edited profile
  */

  const saveProfile = () => {
    if (
      !editForm.name.trim() ||
      !editForm.phone.trim() ||
      !editForm.email.trim()
    ) {
      alert("Please fill all profile details.");
      return;
    }

    const updatedUser = {
      ...user,
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim(),
    };

    localStorage.setItem(
      "foodiehub-user",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "foodiehub-current-user",
      updatedUser.name
    );

    setUser(updatedUser);
    setEditingProfile(false);

    window.dispatchEvent(
      new Event("loginUpdated")
    );
  };

  /*
    Add address
  */

  const addAddress = (e) => {
    e.preventDefault();

    if (
      !addressForm.address.trim() ||
      !addressForm.city.trim() ||
      !addressForm.pincode.trim()
    ) {
      alert("Please fill all address details.");
      return;
    }

    const newAddress = {
      id: Date.now(),
      label: addressForm.label,
      address: addressForm.address.trim(),
      city: addressForm.city.trim(),
      pincode: addressForm.pincode.trim(),
    };

    const updatedAddresses = [
      ...addresses,
      newAddress,
    ];

    localStorage.setItem(
      "foodiehub-addresses",
      JSON.stringify(updatedAddresses)
    );

    setAddresses(updatedAddresses);

    setAddressForm({
      label: "Home",
      address: "",
      city: "",
      pincode: "",
    });

    setShowAddressForm(false);
  };

  /*
    Delete address
  */

  const deleteAddress = (id) => {
    const updatedAddresses =
      addresses.filter(
        (address) => address.id !== id
      );

    localStorage.setItem(
      "foodiehub-addresses",
      JSON.stringify(updatedAddresses)
    );

    setAddresses(updatedAddresses);
  };

  /*
    Add payment method
  */

  const addPaymentMethod = (e) => {
    e.preventDefault();

    if (!paymentForm.details.trim()) {
      alert(
        "Please enter your payment details."
      );
      return;
    }

    const newPayment = {
      id: Date.now(),
      type: paymentForm.type,
      details: paymentForm.details.trim(),
    };

    const updatedPayments = [
      ...paymentMethods,
      newPayment,
    ];

    localStorage.setItem(
      "foodiehub-payment-methods",
      JSON.stringify(updatedPayments)
    );

    setPaymentMethods(updatedPayments);

    setPaymentForm({
      type: "UPI",
      details: "",
    });

    setShowPaymentForm(false);
  };

  /*
    Delete payment method
  */

  const deletePaymentMethod = (id) => {
    const updatedPayments =
      paymentMethods.filter(
        (payment) => payment.id !== id
      );

    localStorage.setItem(
      "foodiehub-payment-methods",
      JSON.stringify(updatedPayments)
    );

    setPaymentMethods(updatedPayments);
  };

  /*
    Logout
  */

  const logout = () => {
    localStorage.removeItem(
      "foodiehub-logged-in"
    );

    localStorage.removeItem(
      "foodiehub-current-user"
    );

    window.dispatchEvent(
      new Event("loginUpdated")
    );

    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT PROFILE SIDEBAR */}

          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* User Header */}

              <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center gap-4">
                  {/* Initial */}

                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-orange-600 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg">
                    {profileInitial}
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold truncate">
                      {user.name}
                    </h1>

                    <p className="text-orange-100 text-sm mt-1">
                      FoodieHub Member
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}

              <div className="p-3">
                <ProfileMenuButton
                  icon={<User size={19} />}
                  title="Personal Details"
                  active={
                    activeSection ===
                    "profile"
                  }
                  onClick={() =>
                    setActiveSection("profile")
                  }
                />

                <ProfileMenuButton
                  icon={
                    <CreditCard size={19} />
                  }
                  title="Payment Methods"
                  active={
                    activeSection ===
                    "payments"
                  }
                  onClick={() =>
                    setActiveSection(
                      "payments"
                    )
                  }
                />

                <ProfileMenuButton
                  icon={<Package size={19} />}
                  title="Order History"
                  active={
                    activeSection ===
                    "orders"
                  }
                  onClick={() =>
                    setActiveSection("orders")
                  }
                />

                <ProfileMenuButton
                  icon={<MapPin size={19} />}
                  title="Saved Addresses"
                  active={
                    activeSection ===
                    "addresses"
                  }
                  onClick={() =>
                    setActiveSection(
                      "addresses"
                    )
                  }
                />

                <div className="border-t border-gray-100 my-3" />

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={19} />
                  <span className="font-medium">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}

          <section className="lg:col-span-8">
            {/* PERSONAL DETAILS */}

            {activeSection ===
              "profile" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Personal Details
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Manage your FoodieHub
                        account information.
                      </p>
                    </div>

                    {!editingProfile && (
                      <button
                        onClick={() =>
                          setEditingProfile(
                            true
                          )
                        }
                        className="flex items-center gap-2 text-orange-600 font-semibold hover:bg-orange-50 px-3 py-2 rounded-xl"
                      >
                        <Edit3 size={17} />
                        <span className="hidden sm:inline">
                          Edit
                        </span>
                      </button>
                    )}
                  </div>

                  {editingProfile ? (
                    <div className="space-y-4">
                      <InputField
                        label="Full Name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            name: e.target
                              .value,
                          })
                        }
                      />

                      <InputField
                        label="Phone Number"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            phone: e.target
                              .value,
                          })
                        }
                      />

                      <InputField
                        label="Email Address"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            email: e.target
                              .value,
                          })
                        }
                      />

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={saveProfile}
                          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold"
                        >
                          <Save size={17} />
                          Save Changes
                        </button>

                        <button
                          onClick={() =>
                            setEditingProfile(
                              false
                            )
                          }
                          className="px-5 py-3 rounded-xl border border-gray-200 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InfoBox
                        icon={
                          <User size={19} />
                        }
                        label="Full Name"
                        value={user.name}
                      />

                      <InfoBox
                        icon={
                          <Phone size={19} />
                        }
                        label="Phone Number"
                        value={
                          user.phone ||
                          "Not added"
                        }
                      />

                      <InfoBox
                        icon={
                          <Mail size={19} />
                        }
                        label="Email Address"
                        value={user.email}
                      />
                    </div>
                  )}
                </div>

                {/* Security */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <ShieldCheck
                        size={23}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Account Security
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Your account is protected
                        with your FoodieHub login.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENT METHODS */}

            {activeSection ===
              "payments" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Payment Methods
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Manage your preferred
                      payment options.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setShowPaymentForm(
                        !showPaymentForm
                      )
                    }
                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold"
                  >
                    <Plus size={18} />
                    Add Payment
                  </button>
                </div>

                {showPaymentForm && (
                  <form
                    onSubmit={
                      addPaymentMethod
                    }
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-5 space-y-4"
                  >
                    <select
                      value={
                        paymentForm.type
                      }
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          type: e.target
                            .value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none"
                    >
                      <option value="UPI">
                        UPI
                      </option>

                      <option value="Card">
                        Credit / Debit Card
                      </option>

                      <option value="Cash">
                        Cash on Delivery
                      </option>
                    </select>

                    <input
                      type="text"
                      placeholder={
                        paymentForm.type ===
                        "UPI"
                          ? "example@upi"
                          : paymentForm.type ===
                            "Card"
                          ? "Card ending in 1234"
                          : "Cash on Delivery"
                      }
                      value={
                        paymentForm.details
                      }
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          details:
                            e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none"
                    />

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowPaymentForm(
                            false
                          )
                        }
                        className="px-5 py-2.5 rounded-xl border border-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {paymentMethods.length ===
                0 ? (
                  <EmptyState
                    icon={
                      <CreditCard
                        size={30}
                      />
                    }
                    title="No payment methods"
                    text="Add a payment method for faster checkout."
                  />
                ) : (
                  <div className="space-y-3">
                    {paymentMethods.map(
                      (payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                              <CreditCard
                                size={20}
                              />
                            </div>

                            <div>
                              <h3 className="font-semibold">
                                {payment.type}
                              </h3>

                              <p className="text-sm text-gray-500">
                                {
                                  payment.details
                                }
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              deletePaymentMethod(
                                payment.id
                              )
                            }
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ORDER HISTORY */}

            {activeSection ===
              "orders" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Order History
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    View your previous FoodieHub
                    orders.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <EmptyState
                    icon={
                      <Package size={30} />
                    }
                    title="No orders yet"
                    text="Your completed orders will appear here."
                    buttonText="Order Food"
                    onClick={() =>
                      navigate("/")
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-100 rounded-xl p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                size={18}
                                className="text-green-500"
                              />

                              <span className="font-bold">
                                Order #
                                {order.id}
                              </span>
                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                              {order.date}
                            </p>
                          </div>

                          <span className="font-bold text-gray-900">
                            ₹{order.total}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          {order.items?.map(
                            (item) => (
                              <div
                                key={item.id}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-600">
                                  {
                                    item.name
                                  }{" "}
                                  ×{" "}
                                  {
                                    item.quantity
                                  }
                                </span>

                                <span className="font-medium">
                                  ₹
                                  {item.price *
                                    item.quantity}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED ADDRESSES */}

            {activeSection ===
              "addresses" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Saved Addresses
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Save your frequently used
                      delivery locations.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setShowAddressForm(
                        !showAddressForm
                      )
                    }
                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold"
                  >
                    <Plus size={18} />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <form
                    onSubmit={addAddress}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-5 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Home",
                        "Work",
                        "Other",
                      ].map((label) => (
                        <button
                          type="button"
                          key={label}
                          onClick={() =>
                            setAddressForm({
                              ...addressForm,
                              label,
                            })
                          }
                          className={`py-2.5 rounded-xl border font-medium ${
                            addressForm.label ===
                            label
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white border-gray-200 text-gray-700"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <textarea
                      placeholder="House no., street, landmark..."
                      rows="3"
                      value={
                        addressForm.address
                      }
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          address:
                            e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none resize-none"
                    />

                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={
                          addressForm.city
                        }
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target
                              .value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none"
                      />

                      <input
                        type="text"
                        placeholder="Pincode"
                        value={
                          addressForm.pincode
                        }
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            pincode:
                              e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold"
                      >
                        Save Address
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAddressForm(
                            false
                          )
                        }
                        className="px-5 py-2.5 rounded-xl border border-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {addresses.length ===
                0 ? (
                  <EmptyState
                    icon={
                      <MapPin size={30} />
                    }
                    title="No saved addresses"
                    text="Add an address to make checkout faster."
                  />
                ) : (
                  <div className="space-y-3">
                    {addresses.map(
                      (address) => (
                        <div
                          key={address.id}
                          className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4"
                        >
                          <div className="flex gap-3">
                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                              <MapPin
                                size={20}
                              />
                            </div>

                            <div>
                              <h3 className="font-bold">
                                {
                                  address.label
                                }
                              </h3>

                              <p className="text-sm text-gray-600 mt-1">
                                {
                                  address.address
                                }
                              </p>

                              <p className="text-sm text-gray-500">
                                {
                                  address.city
                                }{" "}
                                -{" "}
                                {
                                  address.pincode
                                }
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              deleteAddress(
                                address.id
                              )
                            }
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg shrink-0"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------- */
/* Reusable Components               */
/* -------------------------------- */

function ProfileMenuButton({
  icon,
  title,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}

        <span className="font-medium">
          {title}
        </span>
      </div>

      <ChevronRight size={17} />
    </button>
  );
}

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {icon}
        {label}
      </div>

      <p className="font-semibold text-gray-900 mt-2 break-all">
        {value}
      </p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
      />
    </div>
  );
}

function EmptyState({
  icon,
  title,
  text,
  buttonText,
  onClick,
}) {
  return (
    <div className="py-12 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-lg font-bold mt-4">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {text}
      </p>

      {buttonText && (
        <button
          onClick={onClick}
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}