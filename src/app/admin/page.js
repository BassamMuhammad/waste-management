import { CardComp } from "../CardComp";
import trashRecycleImg from "../../../public/trash-recycle.png";
import pickupRouteImg from "../../../public/pickup-route.png";
import statsImg from "../../../public/stats.png";

export default function Admin() {

      const adminOptions = [
        {
          option: "Update Recycling Point",
          img: trashRecycleImg,
          navigateUrl: "/admin/update-recycle",
        },
        {
          option: "Pickup Route",
          img: pickupRouteImg,
          navigateUrl: "/admin/pickup-route",
        },
        {
          option: "Statsistics",
          img: statsImg,
          navigateUrl: "/admin/stats",
        },
      ];
  return (
    <CardComp data={adminOptions}/>
  )
}
