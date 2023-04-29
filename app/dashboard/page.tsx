import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

const revalidate = 0;
const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id, status: "Complete" },
    include: { products: true },
  });
  return orders;
};
export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null) {
    return <h1>Not Logged In</h1>;
  }
  if (orders.length === 0) {
    return <h1>No Orders</h1>;
  }

  return (
    <div>
      <div>
        {orders.map((order) => (
          <div
            className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
            key={order.id}
          >
            <h2 className="text-xs font-medium">Order Reference: {order.id}</h2>

            <p className="text-xs">
              Status:{" "}
              <span
                className={`${
                  order.status === "Complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white px-2 py-1 rounded-md mx-2 px-2 text-xs`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs">
              Time: {order.createdDate.toLocaleString()}
            </p>

            <div className="text-sm lg:flex items-center gap-2">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-baseline gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      priority={true}
                      className="w-auto"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <p className="font-medium py-2">
                    Total: {formatPrice(order.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
