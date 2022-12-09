import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Options } from "../Assets/options.svg";
import { ReactComponent as Download } from "../Assets/download.svg";
import { ReactComponent as Delete } from "../Assets/delete.svg";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Components/Ui/Modal";
import Button from "../Components/Ui/Button";
import { ReactComponent as Question } from "../Assets/question.svg";
import { ReactComponent as Check } from "../Assets/Check.svg";
import { MdDelete } from "react-icons/md";

const HistoryItem = (props) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const [downloadModal, setDownloadModal] = useState(false);
	const [options, setOptions] = useState(false);
	const { user, setCoverLetter, openModal, isModalOpen, setUserData } =
		useGlobalContext();
	const { deleteCoverLetter } = props;
	const toggleOptions = () => {
		setOptions((prevoptions) => !prevoptions);
	};

	const displayDeleteModal = () => {
		setDeleteModal(true);
	};

	const hideDeleteModal = () => {
		setDeleteModal(false);
	};

	const displayDownloadModal = () => {
		setDownloadModal(true);
	};

	const hideDownloadModal = () => {
		setDownloadModal(false);
	};

	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setOptions(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	const navigate = useNavigate();

	const handleHItemClick = (e) => {
		console.log(props.item);
		setCoverLetter(props.item);
		setUserData({ ...user });
		setTimeout(() => {
			navigate("/preview");
		}, 200);
	};

	return (
		<div
			id={props.hid}
			className="bg-[#f1f6ff] w-[297px] h-[450px] px-[45px] pt-[53px] pb-[26px] hover:outline hover:outline-primaryMain relative m-auto"
		>
			{/* {props.item.option && (
				<div ref={ref}>
					<Options
						className="absolute top-5 right-[26px] cursor-pointer"
						onClick={toggleOptions}
					/>
					{options && (
						<div className="w-[146px] h-28 bg-[#f1f6ff] absolute right-1 top-10 border border-primaryLight rounded-md">
							<div
								onClick={() => {
									openModal();
									displayDeleteModal();
									hideDownloadModal();
								}}
								className="flex items-center py-4 px-3.5 cursor-pointer"
							>
								<Delete className="w-6 h-6 mr-[17px]" />
								<p className="font-bold text-base text-primaryMain">
									Delete
								</p>
							</div>
							<hr className="border border-primaryLight" />
							<div
								onClick={() => {
									openModal();
									displayDownloadModal();
									hideDeleteModal();
								}}
								className="flex items-center py-4 px-3.5 cursor-pointer"
							>
								<Download className="w-6 h-6 mr-[17px]" />
								<p className="font-bold text-base text-primaryMain">
									Download
								</p>
							</div>
						</div>
					)}
				</div>
			)} */}

			<div className="flex flex-col">
				<img src={props.image} alt="Recent-CV" className="mb-3" />
				{/* <p className="font-bold text-base text-black underline cursor-pointer">
					{props.item.message}
				</p> */}
				<p className="text-base font-bold mb-2">
					{props.item.company_name}
				</p>
				<p className="text-xs">{props.item.date}</p>
				<div className="flex  items-center gap-3">
					<Button
						className={
							"btn btnLong w-[30%] btnPrimary p-0 mt-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
						}
						children={"view"}
						type={"button"}
						disabled={false}
						onClick={handleHItemClick}
					></Button>
					<Button
						className={
							"btn btnLong w-[30%] btnPrimary bg-errorMain p-0 mt-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
						}
						children={<MdDelete></MdDelete>}
						type={"button"}
						disabled={false}
						onClick={() => {
							deleteCoverLetter(props.hid);
						}}
					></Button>
				</div>
			</div>

			{/* {isModalOpen && deleteModal && (
				<Modal>
					<div className="flex flex-col items-center bg-white w-[757px] h-[398px] max-[768px]:w-[458px] max-[768px]:h-[366px] max-[768px]:text-center max-[460px]:w-[243px] max-[460px]:h-[334px]  rounded-lg py-12 px-4">
						<Question className="w-[150px] h-[150px]" />
						<p className="text-2xl font-bold text-grey400 mt-8 max-[768px]:text-lg max-[460px]:text-sm">
							Are you sure you want to delete this cover letter?
						</p>
						<Button
							onClick={hideDeleteModal}
							className="font-bold text-[#fefefe] text-lg bg-errorMain mt-8 py-3 px-[53px] rounded-lg"
						>
							Delete
						</Button>
					</div>
				</Modal>
			)}
			{isModalOpen && downloadModal && (
				<Modal>
					<div className="flex flex-col items-center bg-white w-[757px] h-[398px] max-[768px]:w-[458px] max-[768px]:h-[366px] max-[768px]:text-center max-[460px]:w-[243px] max-[460px]:h-[334px] rounded-lg py-12 px-4">
						<Check className="w-[150px] h-[150px]" />
						<p className="text-2xl font-bold text-grey400 mt-8 max-[768px]:text-lg max-[460px]:text-sm">
							Downloaded successfully
						</p>
						<Button
							onClick={hideDownloadModal}
							className="font-bold text-[#fefefe] text-lg bg-primaryMain mt-8 py-3 px-[53px] rounded-lg"
						>
							Close
						</Button>
					</div>
				</Modal>
			)} */}
		</div>
	);
};

export default HistoryItem;
