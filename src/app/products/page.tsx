import { productsRepository } from "@/modules/repositories/productsRepository";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { ProductDialog } from "@/app/_components/ProductDialog";
import { DeleteButton } from "@/app/_components/DeleteButton";
import { createProduct } from "@/actions/createProduct";
import { updateProduct } from "@/actions/updateProduct";
import { deleteProduct } from "@/actions/deleteProduct";

const Page = async () => {
  const [stores, products] = await Promise.all([storesRepository.getAll(), productsRepository.getAll()]);

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-2xl font-bold">Products</p>
        <ProductDialog stores={stores} onSubmitAction={createProduct} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg border border-gray-800 bg-gray-900 shadow">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2 text-left">SKU</th>
              <th className="border border-gray-800 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-800 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-800 px-4 py-2 text-left">Store</th>
              <th className="border border-gray-800 px-4 py-2"></th>
              <th className="border border-gray-800 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-800">
                <td className="border border-gray-800 px-4 py-2">{product.sku}</td>
                <td className="border border-gray-800 px-4 py-2">{product.description}</td>
                <td className="border border-gray-800 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-800 px-4 py-2">{product.store.code}</td>
                <td className="border border-gray-800 px-4 py-2 text-center">
                  <ProductDialog
                    stores={stores}
                    onSubmitAction={updateProduct}
                    product={{ ...product, storeId: product.store.id }}
                    mode="edit"
                  />
                </td>
                <td className="border border-gray-800 px-4 py-2 text-center">
                  <DeleteButton productId={product.id} onClickAction={deleteProduct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
