import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, Category } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(1, "Choose a category"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  originalPrice: z.coerce.number().optional(),
  discount: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().min(0, "Stock can't be negative"),
  image: z.string().min(1, "An image is required"),
});

type ProductFormInput = z.input<typeof schema>;
export type ProductFormValues = z.output<typeof schema>;

interface ProductFormProps {
  categories: Category[];
  initialValues?: Product;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

export default function ProductForm({
  categories,
  initialValues,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput, any, ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          category: initialValues.category,
          price: initialValues.price,
          originalPrice: initialValues.originalPrice,
          discount: initialValues.discount,
          stock: initialValues.stock,
          image: initialValues.image,
        }
      : { stock: 0 },
  });

  const imageValue = watch("image");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setValue("image", reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Product name</Label>
        <Input id="name" className="rounded-xl mt-1" {...register("name")} />
        {errors.name && (
          <p className="text-xs text-coral-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="category" className="rounded-xl mt-1">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-xs text-coral-600 mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price (MK)</Label>
          <Input
            id="price"
            type="number"
            className="rounded-xl mt-1"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-xs text-coral-600 mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="originalPrice">Original price (optional)</Label>
          <Input
            id="originalPrice"
            type="number"
            className="rounded-xl mt-1"
            {...register("originalPrice")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discount">Discount % (optional)</Label>
          <Input
            id="discount"
            type="number"
            className="rounded-xl mt-1"
            {...register("discount")}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock quantity</Label>
          <Input
            id="stock"
            type="number"
            className="rounded-xl mt-1"
            {...register("stock")}
          />
          {errors.stock && (
            <p className="text-xs text-coral-600 mt-1">
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>Product image</Label>
        <Tabs
          value={imageMode}
          onValueChange={(v) => setImageMode(v as "url" | "upload")}
          className="mt-1"
        >
          <TabsList className="rounded-xl">
            <TabsTrigger value="url" className="rounded-lg">
              Image URL
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-lg">
              Upload photo
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {imageMode === "url" ? (
          <Input
            className="rounded-xl mt-2"
            placeholder="https://..."
            {...register("image")}
          />
        ) : (
          <Input
            type="file"
            accept="image/*"
            className="rounded-xl mt-2"
            onChange={handleFileChange}
          />
        )}

        {errors.image && (
          <p className="text-xs text-coral-600 mt-1">{errors.image.message}</p>
        )}

        {imageValue && (
          <img
            src={imageValue}
            alt="Preview"
            className="mt-3 h-20 w-20 rounded-xl object-cover border"
          />
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white"
        >
          {initialValues ? "Save changes" : "Add product"}
        </Button>
      </div>
    </form>
  );
}
