import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "upkit";
import { Button, FormControl, InputText, LayoutOne } from "upkit/dist";
import { createAddress } from "../../app/api/address";
import SelectWilayah from "../../components/SelectWilayah";
import TopBar from "../../components/TopBar";
import { rules } from "./validation";
import { useHistory } from "react-router";

export default function UserAddressAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm();
  const allFields = watch();
  const history = useHistory();

  const updateValue = (field, value) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (formData) => {
    let payload = {
      name: formData.nama_alamat,
      detail: formData.detail_alamat,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    };
    const { data } = await createAddress(payload);
    if (data.error) return;
    history.push("/alamat-pengiriman");
  };

  useEffect(() => {
    setValue("kabupaten", null);
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.provinsi, setValue]);

  useEffect(() => {
    setValue("kecamatan", null);
    setValue("kelurahan", null);
  }, [allFields.kabupaten, setValue]);

  useEffect(() => {
    setValue("kelurahan", null);
  }, [allFields.kecamatan, setValue]);

  return (
    <LayoutOne>
      <TopBar />
      <br />
      <div className="mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama alamat" errorMessage={errors.name?.message} color="black"
          >
            <InputText
              placeholder="Nama alamat" fitContainer {...register("nama_alamat", rules.nama_alamat)}
            />
          </FormControl>

          <FormControl
            label="Provinsi" errorMessage={errors.provinsi?.message} color="black"
          >
            <SelectWilayah
              onChange={(option) => updateValue("provinsi", option)} value={getValues().provinsi}
            />
          </FormControl>

          <FormControl
            label="Kabupaten/kota" errorMessage={errors.kabupaten?.message} color="black"
          >
            <SelectWilayah
              tingkat="kabupaten"
              kodeInduk={getValues().provinsi?.value}
              onChange={(option) => updateValue("kabupaten", option)}
              value={getValues().kabupaten}
            />
          </FormControl>

          <FormControl
            label="Kecamatan" errorMessage={errors.kecamatan?.message} color="black"
          >
            <SelectWilayah
              tingkat="kecamatan"
              kodeInduk={getValues().kabupaten?.value}
              onChange={(option) => updateValue("kecamatan", option)}
              value={getValues().kecamatan}
            />
          </FormControl>

          <FormControl
            label="Kelurahan" errorMessage={errors.kelurahan?.message} color="black"
          >
            <SelectWilayah
              tingkat="kelurahan"
              kodeInduk={getValues().kecamatan?.value}
              onChange={(option) => updateValue("kelurahan", option)}
              value={getValues().kelurahan}
            />
          </FormControl>

          <FormControl
            label="Detail alamat" errorMessage={errors.detail_alamat?.message} color="black"
          >
            <Textarea
              placeholder="Detail alamat" fitContainer {...register("detail_alamat", rules.detail_alamat)}
            />
          </FormControl>

          <Button fitContainer size="large">
            Simpan
          </Button>
        </form>
      </div>
    </LayoutOne>
  );
}