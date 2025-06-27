import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { renderAsync } from "../../utils/reactTestUtils";
import Page from "@/app/products/page";
import userEvent from "@testing-library/user-event";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { toastMock } from "@/test/unit/mocks/toastMock";
import { useToast } from "@/hooks/useToast";

vi.mock("@/modules/repositories/productsRepository");
vi.mock("@/modules/repositories/storesRepository");
vi.mock("@/lib/cache");
vi.mock("@/hooks/useToast");

describe("Products page", () => {
  const toast = toastMock();
  const store = { id: 1, code: "KEN" };
  const product = { id: 1, sku: "UK-1011", description: "Item 1", quantity: 8, store };

  beforeEach(() => {
    vi.mocked(useToast).mockImplementation(() => toast);
    vi.mocked(productsRepository.getAll).mockResolvedValue([product]);
    vi.mocked(storesRepository.getAll).mockResolvedValue([store]);
  });

  it("displays list of products", async () => {
    await renderAsync(<Page />);

    expect(screen.getByText(store.code)).toBeVisible();
    expect(screen.getByText(product.sku)).toBeVisible();
    expect(screen.getByText(product.description)).toBeVisible();
    expect(screen.getByText(product.quantity)).toBeVisible();
  });

  it("allows to delete a product", async () => {
    vi.mocked(productsRepository.deleteById);

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Delete"));

    expect(productsRepository.deleteById).toHaveBeenCalledWith(product.id);
  });

  it("displays an error message in a toast if the product can not be deleted", async () => {
    vi.mocked(productsRepository.deleteById).mockRejectedValue(new Error("Error deleting product"));

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Delete"));

    expect(toast.toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error deleting",
        description: expect.any(String),
        variant: "negative",
      }),
    );
  });

  it("allows to create a product", async () => {
    const expectedProduct = { sku: "UK-1014", description: "Item 4", quantity: 4, storeId: store.id };
    vi.mocked(productsRepository.save);

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Add Product"));
    await userEvent.type(screen.getByLabelText("sku"), expectedProduct.sku);
    await userEvent.type(screen.getByLabelText("description"), expectedProduct.description);
    await userEvent.type(screen.getByLabelText("quantity"), expectedProduct.quantity.toString());
    await userEvent.selectOptions(screen.getByLabelText("store").nextElementSibling!, store.id.toString());
    await userEvent.click(screen.getByText("Save"));

    expect(productsRepository.save).toHaveBeenCalledWith(expectedProduct);
  });

  it("displays an error message in a toast if the product can not be added", async () => {
    const product = { sku: "UK-1014", description: "Item 4", quantity: 4, storeId: store.id };
    vi.mocked(productsRepository.save).mockRejectedValue(new Error("Error adding product"));

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Add Product"));
    await userEvent.type(screen.getByLabelText("sku"), product.sku);
    await userEvent.type(screen.getByLabelText("description"), product.description);
    await userEvent.type(screen.getByLabelText("quantity"), product.quantity.toString());
    await userEvent.click(screen.getByText("Save"));

    expect(toast.toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error submitting form",
        description: expect.any(String),
        variant: "negative",
      }),
    );
  });

  it("allows to edit a product", async () => {
    const updatedProduct = {
      id: product.id,
      sku: "UK-1011-UPDATED",
      description: "Updated Item",
      quantity: 10,
      storeId: store.id,
    };
    vi.mocked(productsRepository.update);

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Edit"));
    await userEvent.clear(screen.getByLabelText("sku"));
    await userEvent.type(screen.getByLabelText("sku"), updatedProduct.sku);

    await userEvent.clear(screen.getByLabelText("description"));
    await userEvent.type(screen.getByLabelText("description"), updatedProduct.description);

    await userEvent.clear(screen.getByLabelText("quantity"));
    await userEvent.type(screen.getByLabelText("quantity"), updatedProduct.quantity.toString());

    await userEvent.selectOptions(screen.getByLabelText("store").nextElementSibling!, store.id.toString());
    await userEvent.click(screen.getByText("Save"));

    expect(productsRepository.update).toHaveBeenCalledWith(updatedProduct);
  });

  it("displays an error message in a toast if the product can not be updated", async () => {
    vi.mocked(productsRepository.update).mockRejectedValue(new Error("Error updating product"));

    await renderAsync(<Page />);

    await userEvent.click(screen.getByText("Edit"));
    await userEvent.click(screen.getByText("Save"));

    expect(toast.toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error submitting form",
        description: expect.any(String),
        variant: "negative",
      }),
    );
  });
});
