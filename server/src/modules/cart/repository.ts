import { prisma } from "../../db/prisma";

async function ensureGuestUser(guestId: string) {
  return prisma.user.upsert({
    where: { id: guestId },
    create: {
      id: guestId,
      email: `${guestId}@guest.local`,
      name: "Guest",
    },
    update: {},
  });
}

export async function getCartByGuestId(guestId: string) {
  await ensureGuestUser(guestId);

  return prisma.cart.upsert({
    where: { userId: guestId },
    create: { userId: guestId },
    update: {},
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getProductById(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
  });
}

export async function getCartItem(cartId: string, productId: string) {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId, productId },
    },
  });
}

export async function upsertCartItem(
  cartId: string,
  productId: string,
  quantity: number
) {
  return prisma.cartItem.upsert({
    where: {
      cartId_productId: { cartId, productId },
    },
    create: {
      cartId,
      productId,
      quantity,
    },
    update: {
      quantity,
    },
  });
}

export async function deleteCartItem(cartId: string, productId: string) {
  return prisma.cartItem.deleteMany({
    where: { cartId, productId },
  });
}

export async function getCartById(id: string) {
  return prisma.cart.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
